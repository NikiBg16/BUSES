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
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Списък на маршрутите</h1>

            <div className="d-flex justify-content-center mb-4">
                <div className="card w-100" style={{ maxWidth: "600px" }}>
                    <div className="card-body">
                        <RouteForm
                            onSuccess={() => {
                                fetchRoutes();
                                setEditing(null);
                            }}
                            initialData={editing || undefined}
                        />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <RouteList
                        routes={routes}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
}
