const { spawn } = require("child_process");
const Application = require("../models/Application");
const extractIcon = require("extract-file-icon");
const fs = require("fs");
const WinReg = require("winreg");
const path = require("path");

let runningProcess = null;

exports.getApps = async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
};



function findExe(dir, exePath) {
  let files;
  try {
    files = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {

    return null;
  }

  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      const found = findExe(full, exePath);
      if (found) return found;
    } else if (f.name.toLowerCase() === exePath.toLowerCase()) {
      return full;
    }
  }

  return null;
}


exports.addApp = async (req, res) => {
  try {
    let { name, exePath, parameter } = req.body;

    if (!name || !exePath) {
      return res.status(400).json({
        success: false,
        message: "Name and exePath are required"
      });
    }

    parameter = (parameter || "").trim();

    const roots = ["C:\\Program Files", "C:\\Program Files (x86)"];
    let resolvedPath = null;

    for (const root of roots) {
      const found = findExe(root, exePath);
      if (found) {
        resolvedPath = found;
        break;
      }
    }

    if (!resolvedPath) {
      return res.status(404).json({
        success: false,
        message: "Executable not found on system"
      });
    }


    const existingApps = await Application.find({ exePath: resolvedPath });
    const isDuplicate = existingApps.some(
      (app) => (app.parameter || "") === parameter
    );

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: "Application with same executable and parameter already added"
      });
    }

    const app = await Application.create({
      name,
      exePath: resolvedPath,
      parameter
    });

    res.json({
      success: true,
      message: "Application created successfully",
      app
    });

  } catch (err) {
    console.error("Add App Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Try again"
    });
  }
};





exports.deleteApp = async (req, res) => {
  try {
    const data = await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




exports.launchApp = async (req, res) => {
  const { id } = req.body;
  const app = await Application.findById(id);

  if (!app) return res.status(404).json({ success: false, error: "App not found" });

  try {
    if (runningProcess) runningProcess.kill();

    if (process.platform === "win32") {

      runningProcess = spawn(
        `"${app.exePath}"`,
        app.parameter ? app.parameter.split(" ") : [],
        { shell: true, detached: true, stdio: "ignore" }
      );

      runningProcess.unref();
      runningProcess.on("error", (err) => console.error("Launch error:", err));
    } else {
      return res.status(500).json({ success: false, error: "Unsupported OS" });
    }

    res.json({ success: true, status: `${app.name} launched` });
  } catch (err) {
    console.error("Launch failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};






exports.getIcon = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).end();

  if (!fs.existsSync(app.exePath)) {
    return res.sendFile(path.join(__dirname, "../public/default-app.png"));
  }

  try {
    const buffer = extractIcon(app.exePath, 32);
    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch {
    res.sendFile(path.join(__dirname, "../public/default-app.png"));
  }
};





exports.discoverApps = async (req, res) => {
  const locations = [
    new WinReg({
      hive: WinReg.HKLM,
      key: "\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall"
    }),
    new WinReg({
      hive: WinReg.HKLM,
      key: "\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"
    })
  ];

  const apps = [];

  const readKey = (regKey) =>
    new Promise((resolve) => {
      regKey.keys((err, items) => {
        if (err || !items) return resolve();

        let pending = items.length;
        if (!pending) return resolve();

        items.forEach((item) => {
          item.values((_, values) => {
            const name = values.find(v => v.name === "DisplayName")?.value;
            const icon = values.find(v => v.name === "DisplayIcon")?.value;

            if (name && icon && icon.toLowerCase().endsWith(".exe")) {
              apps.push({
                name,
                exePath: icon.replace(/,.*$/, "")
              });
            }

            if (!--pending) resolve();
          });
        });
      });
    });

  for (const loc of locations) {
    await readKey(loc);
  }

  res.json(apps);
};
