// frontend/src/components/BusList.tsx
import React from "react";

// Интерфейс за автобус
export interface Bus {
    id: number;
    number: string;
    carrier: string;
    capacity: number;
    isActive: boolean;
}

// Описваме проповете: списък автобуси, callback за изтриване и callback за редактиране
interface Props {
    buses: Bus[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const BusList: React.FC<Props> = ({ buses, onDelete, onEdit }) => {
    if (buses.length === 0) {
        return <p>Няма налични автобуси.</p>;
    }

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Номер</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Превозвач</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Капацитет</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Активен</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Действия</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Редакция</th>
            </tr>
            </thead>
            <tbody>
            {buses.map((bus) => (
                <tr key={bus.id}>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{bus.number}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{bus.carrier}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{bus.capacity}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                        {bus.isActive ? "Да" : "Не"}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button onClick={() => onDelete(bus.id)}>❌</button>
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button onClick={() => onEdit(bus.id)}>✏️</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default BusList;
