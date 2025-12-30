import { useEffect, useState, useRef } from "react";
import "../styles/setting.css";
import Toast from "../component/Toast";

export default function Settings({ goHome }) {
  const [apps, setApps] = useState([]);
  const [name, setName] = useState("");
  const [exePath, setExePath] = useState("");
  const [parameter, setParameter] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const fileInputRef = useRef(null); // <- Add this ref

  const fetchApps = async () => {
    const res = await fetch("http://192.168.0.192:2354/api/apps");
    const data = await res.json();
    setApps(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExePath(file.name);
    setName(file.name.replace(/\.exe$/i, ""));
  };

  const handleAdd = async () => {
    if (!name || !exePath) {
      setToast({ message: "Please select application first", type: "error" });
      return;
    }

    const alreadyExists = apps.some(
      (app) =>
        app.exePath.toLowerCase() === exePath.toLowerCase() &&
        (app.parameter || "") === (parameter || "")
    );

    if (alreadyExists) {
      setToast({
        message: "Application with same exe and parameter already added",
        type: "error"
      });
      return;
    }

    try {
      const res = await fetch("http://192.168.0.192:2354/api/apps/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, exePath, parameter })
      });

      const data = await res.json();

      if (data.success) {
        setToast({
          message: data.message || "Application added successfully",
          type: "success"
        });

        // Reset fields
        setName("");
        setExePath("");
        setParameter("");
        if (fileInputRef.current) fileInputRef.current.value = ""; // <- Clear file input
        fetchApps();
      } else {
        setToast({
          message: data.message || "Failed to add application",
          type: "error"
        });
      }
    } catch (err) {
      setToast({
        message: "Server error. Try again",
        type: "error"
      });
    }
  };

  const handleRemove = async (id) => {
    await fetch(`http://192.168.0.192:2354/api/apps/${id}`, {
      method: "DELETE"
    });
    fetchApps();
  };

  return (
    <div className="settings-container">
      <h3 className="section-title">Applications</h3>
      <div className="card large">
        <div className="inputs">
          <input
            placeholder="Application name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Optional parameter (e.g., URL)"
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
          />
          <input
            type="file"
            accept=".exe"
            onChange={handleFileSelect}
            ref={fileInputRef} // <- Attach ref
          />
        </div>
        <div className="btn-row">
          <button className="primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      <div className="card card-container">
        {apps.map((app) => (
          <div key={app._id} className="app-row">
            <span>{app.name}</span>
            <button className="danger" onClick={() => handleRemove(app._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
        duration={3000}
      />
    </div>
  );
}
