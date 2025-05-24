// src/components/StopList.tsx
import React from "react";

export interface Stop {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface Props {
    stops: Stop[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const StopList: React.FC<Props> = ({ stops, onDelete, onEdit }) => {
    if (stops.length === 0) return <p>Няма налични спирки.</p>;

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Име</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Адрес</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Ширина</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Дължина</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Действия</th>
            </tr>
            </thead>
            <tbody>
            {stops.map((s) => (
                <tr key={s.id}>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.address}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.latitude}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.longitude}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button
                            onClick={() => onDelete(s.id)}
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
                            onClick={() => onEdit(s.id)}
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

export default StopList;
