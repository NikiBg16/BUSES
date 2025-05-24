// src/pages/SchedulesPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import ScheduleList from "../components/ScheduleList";
import type { Schedule } from "../components/ScheduleList";
import type { Bus } from "../components/BusList";
import type { Stop } from "../components/StopList";
import ScheduleForm from "../components/ScheduleForm";

interface ScheduleData {
    id: number;
    busId: number;
    stopId: number;
    departureTime: string;
    dwellTime: number;
}

export default function SchedulesPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [buses, setBuses] = useState<Bus[]>([]);
    const [stops, setStops] = useState<Stop[]>([]);
    const [editing, setEditing] = useState<ScheduleData | null>(null);

    const fetchAll = () => {
        api.get<Schedule[]>("/schedules").then((r) => setSchedules(r.data));
        api.get<Bus[]>("/buses").then((r) => setBuses(r.data));
        api.get<Stop[]>("/stops").then((r) => setStops(r.data));
    };

    const handleDelete = (id: number) => {
        if (!confirm("Сигурни ли сте?")) return;
        api.delete(`/schedules/${id}`).then(() => {
            if (editing?.id === id) setEditing(null);
            fetchAll();
        });
    };

    const handleEdit = (id: number) => {
        const sch = schedules.find((s) => s.id === id);
        if (!sch) return;
        setEditing({
            id: sch.id,
            busId: sch.bus.id,
            stopId: sch.stop.id,
            departureTime: sch.departureTime,
            dwellTime: sch.dwellTime,
        });
    };

    useEffect(fetchAll, []);

    return (
        <main style={{ padding: "1rem" }}>
            <h1>Списък на разписанията</h1>
            <ScheduleForm
                buses={buses}
                stops={stops}
                onSuccess={() => {
                    fetchAll();
                    setEditing(null);
                }}
                initialData={editing as any}
            />
            <ScheduleList
                schedules={schedules}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </main>
    );
}
