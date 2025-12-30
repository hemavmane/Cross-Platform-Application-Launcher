import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/opezee-logo.webp";


export default function LauncherLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSettingsPage = location.pathname.includes("settings");

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-top">
          <img src={logo} alt="Opezee" className="logo" />
          <a
            href="https://opezee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="website-link"
          >
            www.opezee.com
          </a>
        </div>

        <div className="sidebar-bottom">
          {!isSettingsPage ? (
            <button
              className="icon-btn"
              onClick={() => navigate("/settings")}
            >
              ⚙️
            </button>
          ) : (
            <button
              className="icon-btn"
              onClick={() => navigate("/")}
            >
              🏠
            </button>
          )}
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
