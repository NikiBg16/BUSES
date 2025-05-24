// src/pages/BusesPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import BusList from "../components/BusList";
import type { Bus } from "../components/BusList";
import BusForm from "../components/BusForm";

export default function BusesPage() {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [editingBus, setEditingBus] = useState<Bus | null>(null);

    // Зареждаме списъка от автобуси
    const fetchBuses = () => {
        api
            .get<Bus[]>("/buses")
            .then((res) => setBuses(res.data))
            .catch((err) => console.error(err));
    };

    // Изтриваме един автобус и после обновяваме списъка
    const handleDelete = (id: number) => {
        if (!confirm("Сигурни ли сте, че искате да изтриете този автобус?")) return;
        api
            .delete(`/buses/${id}`)
            .then(() => {
                // ако изтриваме разглеждания в момента за редакция, нулираме формата
                if (editingBus?.id === id) setEditingBus(null);
                fetchBuses();
            })
            .catch((err) => {
                console.error(err);
                alert("Грешка при изтриване");
            });
    };

    // Стартираме редакция на автобус: зареждаме данните в BusForm
    const handleEdit = (id: number) => {
        const bus = buses.find((b) => b.id === id) || null;
        setEditingBus(bus);
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    return (
        <main style={{ padding: "1rem" }}>
            <h1>Списък на автобусите</h1>

            {/* Форма за добавяне или редакция */}
            <BusForm
                onSuccess={() => {
                    fetchBuses();
                    setEditingBus(null);
                }}
                initialData={editingBus || undefined}
            />

            {/* Таблица със списък и бутони за действие */}
            <BusList
                buses={buses}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </main>
    );
}
