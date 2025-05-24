// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusesPage from "./pages/BusesPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BusesPage />} />
            </Routes>
        </BrowserRouter>
    );
}
