// src/pages/BusesPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import BusList from "../components/BusList";
import type { Bus } from "../components/BusList";

export default function BusesPage() {
    const [buses, setBuses] = useState<Bus[]>([]);

    useEffect(() => {
        api
            .get<Bus[]>("/buses")
            .then((res) => setBuses(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <main style={{ padding: "1rem" }}>
            <h1>Списък на автобусите</h1>
            <BusList buses={buses} />
        </main>
    );
}
