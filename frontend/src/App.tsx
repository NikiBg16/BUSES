// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BusesPage from "./pages/BusesPage";
import StopsPage from "./pages/StopsPage";
import RoutesPage from "./pages/RoutesPage";
import SchedulesPage from "./pages/SchedulesPage";

export default function App() {
    const linkStyle = {
        marginRight: "1rem",
        textDecoration: "none",
        color: "black",
    };

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    };

    return (
        <BrowserRouter>
            <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <NavLink to="/" style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }>
                    Автобуси
                </NavLink>
                <NavLink to="/stops" style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }>
                    Спирки
                </NavLink>
                <NavLink to="/routes" style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }>
                    Маршрути
                </NavLink>
                <NavLink to="/schedules" style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }>
                    Разписания
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<BusesPage />} />
                <Route path="/stops" element={<StopsPage />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/schedules" element={<SchedulesPage />} />
            </Routes>
        </BrowserRouter>
    );
}
