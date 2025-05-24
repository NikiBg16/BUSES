// src/pages/RoutesPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import RouteList from "../components/RouteList";
import type { Route } from "../components/RouteList";
import RouteForm from "../components/RouteForm";

export default function RoutesPage() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [editing, setEditing] = useState<Route | null>(null);

    const fetchRoutes = () => {
        api.get<Route[]>("/routes").then((r) => setRoutes(r.data)).catch(console.error);
    };

    const handleDelete = (id: number) => {
        if (!confirm("Сигурни ли сте?")) return;
        api.delete(`/routes/${id}`).then(() => {
            if (editing?.id === id) setEditing(null);
            fetchRoutes();
        });
    };

    const handleEdit = (id: number) => {
        const rt = routes.find((x) => x.id === id) || null;
        setEditing(rt);
    };

    useEffect(fetchRoutes, []);

    return (
        <main style={{ padding: "1rem" }}>
            <h1>Списък на маршрутите</h1>
            <RouteForm
                onSuccess={() => {
                    fetchRoutes();
                    setEditing(null);
                }}
                initialData={editing || undefined}
            />
            <RouteList
                routes={routes}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </main>
    );
}
