// src/components/ScheduleList.tsx
import React from "react";
import type { Bus } from "./BusList";
import type { Stop } from "./StopList";

export interface Schedule {
    id: number;
    bus: Bus;
    stop: Stop;
    departureTime: string;
    dwellTime: number;
}

interface Props {
    schedules: Schedule[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const ScheduleList: React.FC<Props> = ({ schedules, onDelete, onEdit }) => {
    if (schedules.length === 0) {
        return <p>Няма налични разписания.</p>;
    }

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Автобус</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Спирка</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Отпътуване</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Задържане (мин)</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Действия</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Редакция</th>
            </tr>
            </thead>
            <tbody>
            {schedules.map((s) => (
                <tr key={s.id}>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.bus.number}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.stop.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.departureTime}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.dwellTime}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button onClick={() => onDelete(s.id)}>❌</button>
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                        <button onClick={() => onEdit(s.id)}>✏️</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ScheduleList;
