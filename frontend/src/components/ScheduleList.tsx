// src/components/ScheduleList.tsx
import React, { useState } from "react";
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
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());

    if (schedules.length === 0) {
        return <p>Няма налични разписания.</p>;
    }

    // Group schedules by bus id
    const schedulesByBus = schedules.reduce((acc, schedule) => {
        const busId = schedule.bus.id;
        if (!acc[busId]) {
            acc[busId] = {
                bus: schedule.bus,
                schedules: [],
            };
        }
        acc[busId].schedules.push(schedule);
        return acc;
    }, {} as Record<number, { bus: Bus; schedules: Schedule[] }>);

    const toggleOpen = (busId: number) => {
        setOpenIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(busId)) {
                newSet.delete(busId);
            } else {
                newSet.add(busId);
            }
            return newSet;
        });
    };

    return (
        <div style={{ padding: "2rem 1rem", display: "flex", justifyContent: "center" }}>
            <table style={{ width: "90%", maxWidth: "1000px", margin: "0 auto", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      style={{
                        textAlign: "center",
                        background: "linear-gradient(to right, #f81ce5, #7928ca)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        padding: "1rem",
                        borderRadius: "8px 8px 0 0",
                        border: "none"
                      }}
                    >
                      Автобус
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {Object.values(schedulesByBus).map(({ bus, schedules }) => (
                        <React.Fragment key={bus.id}>
                            <tr
                              onClick={() => toggleOpen(bus.id)}
                              style={{ cursor: "pointer", userSelect: "none" }}
                            >
                                <td style={{
                                    padding: "1rem",
                                    background: "linear-gradient(to right, #f81ce5, #7928ca)",
                                    color: "white",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    margin: "10px 0",
                                    textAlign: "center",
                                    width: "100%"
                                }}>
                                    {bus.number} {openIds.has(bus.id) ? "▼" : "▶"}
                                </td>
                            </tr>
                            {openIds.has(bus.id) && (
                                <tr>
                                    <td style={{ padding: 0, border: "none" }}>
                                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 0, backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Спирка</th>
                                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Отпътуване</th>
                                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Задържане (мин)</th>
                                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {schedules.map(s => (
                                                    <tr key={s.id} style={{ backgroundColor: "#f9f9f9" }}>
                                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.stop.name}</td>
                                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.departureTime}</td>
                                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.dwellTime}</td>
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
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleList;
