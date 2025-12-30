import { BrowserRouter, Routes, Route } from "react-router-dom";
import LauncherLayout from "./pages/LauncherShell";
import Settings from "./pages/Settings";
import LauncherUI from "./pages/launcher";
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/Launcher">
      <Routes>
        <Route element={<LauncherLayout />}>
          <Route index element={<LauncherUI />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
