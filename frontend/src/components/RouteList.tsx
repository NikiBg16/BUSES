// src/components/RouteList.tsx
import React from "react";

export interface Route {
    id: number;
    name: string;
}

interface Props {
    routes: Route[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const RouteList: React.FC<Props> = ({ routes, onDelete, onEdit }) => {
    if (routes.length === 0) return <p>Няма налични маршрути.</p>;

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Име</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Действия</th>
            </tr>
            </thead>
            <tbody>
            {routes.map((r) => (
                <tr key={r.id}>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button
                            onClick={() => onDelete(r.id)}
                            style={{
                                marginRight: "0.5rem",
                                backgroundColor: "#ff4d4f",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 10px",
                                cursor: "pointer"
                            }}
                        >
                            ❌
                        </button>
                        <button
                            onClick={() => onEdit(r.id)}
                            style={{
                                backgroundColor: "#1890ff",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 10px",
                                cursor: "pointer"
                            }}
                        >
                            ✏️
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RouteList;
