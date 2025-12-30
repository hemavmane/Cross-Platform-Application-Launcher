
import { useState, useEffect } from "react";
import AppCard from "./AppCard";

function LauncherUI() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApps = async () => {
    const res = await fetch("http://192.168.0.192:2354/api/apps");
    console.log(res, "res")
    const data = await res.json();
    setApps(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const launchApp = async (app) => {
    setLoading(true);
    const res = await fetch("http://192.168.0.192:2354/api/apps/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: app._id })
    });
    const data = await res.json();
    setLoading(false);
    alert(data.status || data.error);
  };


  return (
   <div className="launcher-container">
      <div className="apps-grid">
        {apps.map(app => (
          <AppCard
            key={app._id}
            app={app}
            onLaunch={launchApp}
          />
        ))}
      </div>
    </div>
  );
}

export default LauncherUI;
