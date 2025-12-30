import { useState, useEffect } from "react";
import AppCard from "./AppCard";


function LauncherUI() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [launchingApp, setLaunchingApp] = useState(null);

  const fetchApps = async () => {
    const res = await fetch("http://192.168.0.192:2354/api/apps");
    const data = await res.json();
    setApps(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const launchApp = async (app) => {
    setLoading(true);
    setLaunchingApp(app);
    try {
      const res = await fetch("http://192.168.0.192:2354/api/apps/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: app._id }),
      });
      const data = await res.json();
      alert(data.status || data.error);
    } catch (err) {
      alert("Error launching app");
    }
    setLoading(false);
    setLaunchingApp(null);
  };

  const goHome = () => {
    setLoading(false);
    setLaunchingApp(null);
  };

  if (loading && launchingApp) {
    return (
      <div className="launcher-loading-container">
        <div className="spinner"></div>
        <h3 className="launching-text">Launching {launchingApp.name}...</h3>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>
    );
  }

  return (
    <div className="launcher-container">
      <div className="apps-grid">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} onLaunch={launchApp} />
        ))}
      </div>
    </div>
  );
}

export default LauncherUI;
