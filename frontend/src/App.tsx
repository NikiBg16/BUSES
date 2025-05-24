// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BusesPage from "./pages/BusesPage";
import StopsPage from "./pages/StopsPage";
import RoutesPage from "./pages/RoutesPage";
import SchedulesPage from "./pages/SchedulesPage";

export default function App() {
    return (
        <BrowserRouter>
            <nav
              className="navbar bg-white shadow-sm rounded-pill px-4 fixed-top"
              style={{
                display: "inline-block",
                left: "50%",
                transform: "translateX(-50%)",
                top: "1rem",
                paddingInline: "1.5rem",
                boxShadow: "0 0 4px 2px rgba(255, 0, 150, 0.6), 0 0 12px 4px rgba(0, 119, 255, 0.4)"
              }}
            >
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <span style={{ fontSize: "1.5rem" }}>🚌</span>
                        <NavLink to="/" className={({ isActive }) =>
                            "nav-link px-2" + (isActive ? " fw-bold text-primary neon-nav-link" : " neon-nav-link")
                        }>
                            Автобуси
                        </NavLink>
                        <NavLink to="/stops" className={({ isActive }) =>
                            "nav-link px-2" + (isActive ? " fw-bold text-primary neon-nav-link" : " neon-nav-link")
                        }>
                            Спирки
                        </NavLink>
                        <NavLink to="/routes" className={({ isActive }) =>
                            "nav-link px-2" + (isActive ? " fw-bold text-primary neon-nav-link" : " neon-nav-link")
                        }>
                            Маршрути
                        </NavLink>
                        <NavLink to="/schedules" className={({ isActive }) =>
                            "nav-link px-2" + (isActive ? " fw-bold text-primary neon-nav-link" : " neon-nav-link")
                        }>
                            Разписания
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 pt-4">
                <Routes>
                    <Route path="/" element={<BusesPage />} />
                    <Route path="/stops" element={<StopsPage />} />
                    <Route path="/routes" element={<RoutesPage />} />
                    <Route path="/schedules" element={<SchedulesPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
