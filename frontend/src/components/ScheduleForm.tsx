// src/components/ScheduleForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import type { Bus } from "./BusList";
import type { Stop } from "./StopList";

interface Values {
    busId: number;
    stopId: number;
    departureTime: string;
    dwellTime: number;
}

const ScheduleSchema = Yup.object().shape({
    busId: Yup.number().required("Автобусът е задължителен"),
    stopId: Yup.number().required("Спирката е задължителна"),
    departureTime: Yup.string().required("Времето е задължително"),
    dwellTime: Yup.number()
        .required("Задържане е задължително")
        .min(0, "Не може да е отрицателно"),
});

interface Props {
    buses: Bus[];
    stops: Stop[];
    onSuccess: () => void;
    initialData?: Values & { id: number };
}

const ScheduleForm: React.FC<Props> = ({
                                           buses,
                                           stops,
                                           onSuccess,
                                           initialData,
                                       }) => {
    const isEdit = Boolean(initialData);

    const initialValues: Values = initialData
        ? {
            busId: initialData.busId,
            stopId: initialData.stopId,
            departureTime: initialData.departureTime,
            dwellTime: initialData.dwellTime,
        }
        : {
            busId: buses[0]?.id ?? 0,
            stopId: stops[0]?.id ?? 0,
            departureTime: "",
            dwellTime: 0,
        };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={ScheduleSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const req = isEdit
                    ? api.put(`/schedules/${initialData!.id}`, values)
                    : api.post("/schedules", values);

                req
                    .then(() => {
                        resetForm();
                        onSuccess();
                    })
                    .catch(() =>
                        alert(isEdit ? "Грешка при редакция" : "Грешка при създаване")
                    )
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{ marginBottom: "1rem" }}>
                    <div>
                        <label htmlFor="busId">Автобус</label>
                        <Field as="select" name="busId" id="busId">
                            {buses.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.number}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage
                            name="busId"
                            render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        />
                    </div>

                    <div>
                        <label htmlFor="stopId">Спирка</label>
                        <Field as="select" name="stopId" id="stopId">
                            {stops.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage
                            name="stopId"
                            render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        />
                    </div>

                    <div>
                        <label htmlFor="departureTime">Отпътуване</label>
                        <Field id="departureTime" name="departureTime" type="time" />
                        <ErrorMessage
                            name="departureTime"
                            render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        />
                    </div>

                    <div>
                        <label htmlFor="dwellTime">Задържане (мин)</label>
                        <Field id="dwellTime" name="dwellTime" type="number" />
                        <ErrorMessage
                            name="dwellTime"
                            render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isEdit ? "Запази" : "Добави разписание"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ScheduleForm;
