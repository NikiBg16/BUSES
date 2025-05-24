// src/components/ScheduleForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";

export interface Values {
    busId: number;
    stopId: number;
    departureTime: string;
    dwellTime: number;
}

interface Props {
    buses: { id: number; number: string }[];
    stops: { id: number; name: string }[];
    onSuccess: () => void;
    initialData?: Values & { id: number };
}

const ScheduleSchema = Yup.object().shape({
    busId: Yup.number().required(),
    stopId: Yup.number().required(),
    departureTime: Yup.string().required("Изисква се час на тръгване"),
    dwellTime: Yup.number().min(0, "Време за престой не може да е отрицателно").required(),
});

const ScheduleForm: React.FC<Props> = ({ buses, stops, onSuccess, initialData }) => {
    const isEdit = Boolean(initialData);

    const initialValues: Values = initialData
        ? {
              busId: initialData.busId,
              stopId: initialData.stopId,
              departureTime: initialData.departureTime,
              dwellTime: initialData.dwellTime,
          }
        : {
              busId: buses[0]?.id || 0,
              stopId: stops[0]?.id || 0,
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

                req.then(() => {
                    resetForm();
                    onSuccess();
                })
                .catch(() => alert("Грешка при записване"))
                .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form className="p-4 bg-white rounded-4 shadow-sm mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div className="mb-3">
                        <label htmlFor="busId" className="form-label">Автобус</label>
                        <Field as="select" id="busId" name="busId" className="form-select">
                            {buses.map((bus) => (
                                <option key={bus.id} value={bus.id}>{bus.number}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="busId" render={(msg) => <div className="form-text text-danger">{msg}</div>} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stopId" className="form-label">Спирка</label>
                        <Field as="select" id="stopId" name="stopId" className="form-select">
                            {stops.map((stop) => (
                                <option key={stop.id} value={stop.id}>{stop.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="stopId" render={(msg) => <div className="form-text text-danger">{msg}</div>} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="departureTime" className="form-label">Час на тръгване</label>
                        <Field id="departureTime" name="departureTime" type="time" className="form-control" />
                        <ErrorMessage name="departureTime" render={(msg) => <div className="form-text text-danger">{msg}</div>} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dwellTime" className="form-label">Престой (в минути)</label>
                        <Field id="dwellTime" name="dwellTime" type="number" className="form-control" />
                        <ErrorMessage name="dwellTime" render={(msg) => <div className="form-text text-danger">{msg}</div>} />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-lg btn-primary rounded-pill px-4 shadow-sm"
                    >
                        {isEdit ? "Запази промените" : "Добави разписание"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ScheduleForm;
