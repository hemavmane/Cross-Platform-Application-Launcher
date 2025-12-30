const BASE = "";

export const getApps = async () =>
  fetch(`${BASE}/api/apps`).then(r => r.json());

export const launchApp = (appId) =>
  fetch(`/api/launch/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId })
  });

export const stopApp = () =>
  fetch(`/api/launch/stop`, { method: "POST" });
