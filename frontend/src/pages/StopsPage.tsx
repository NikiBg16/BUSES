// src/pages/StopsPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import StopList from "../components/StopList";
import type { Stop } from "../components/StopList";
import StopForm from "../components/StopForm";

export default function StopsPage() {
    const [stops, setStops] = useState<Stop[]>([]);
    const [editing, setEditing] = useState<Stop | null>(null);

    const fetchStops = () => {
        api.get<Stop[]>("/stops").then(r => setStops(r.data)).catch(console.error);
    };
    const handleDelete = (id: number) => {
        if (!confirm("Сигурни ли сте?")) return;
        api.delete(`/stops/${id}`).then(() => {
            if (editing?.id === id) setEditing(null);
            fetchStops();
        });
    };
    const handleEdit = (id: number) => {
        const s = stops.find(x => x.id === id) || null;
        setEditing(s);
    };

    useEffect(fetchStops, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Списък на спирките</h1>

            <div className="d-flex justify-content-center mb-4">
                <div className="card w-100" style={{ maxWidth: "600px" }}>
                    <div className="card-body">
                        <StopForm
                            onSuccess={() => {
                                fetchStops();
                                setEditing(null);
                            }}
                            initialData={editing || undefined}
                        />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <StopList
                        stops={stops}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
}
