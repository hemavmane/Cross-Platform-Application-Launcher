import { stopApp } from "../api/launcherApi";

export default function Loading({ onHome }) {
  return (
    <div>
      <h2>Launching...</h2>
      <button
        onClick={async () => {
          await stopApp();
          onHome();
        }}
      >
        Home
      </button>
    </div>
  );
}
