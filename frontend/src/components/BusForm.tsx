// frontend/src/components/BusForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import type { Bus } from "./BusList";

// Тип на стойностите във формуляра
interface Values {
    number: string;
    carrier: string;
    capacity: number;
    isActive: boolean;
}

// Схема за валидация
const BusSchema = Yup.object().shape({
    number: Yup.string().required("Номерът е задължителен"),
    carrier: Yup.string().required("Превозвачът е задължителен"),
    capacity: Yup.number()
        .required("Капацитетът е задължителен")
        .min(1, "Капацитетът трябва да е ≥ 1"),
    isActive: Yup.boolean().required("Трябва да изберете дали е активен"),
});

// Декларираме проповете на компонента, включително initialData за редакция
interface BusFormProps {
    onSuccess: () => void;
    initialData?: Bus;
}

const BusForm: React.FC<BusFormProps> = ({ onSuccess, initialData }) => {
    const isEdit = Boolean(initialData);

    // Настройваме началните стойности – или празни за нов, или от initialData за редакция
    const initialValues: Values = initialData
        ? {
            number: initialData.number,
            carrier: initialData.carrier,
            capacity: initialData.capacity,
            isActive: initialData.isActive,
        }
        : {
            number: "",
            carrier: "",
            capacity: 1,
            isActive: true,
        };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={BusSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const request = isEdit
                    ? api.put(`/buses/${initialData!.id}`, values)
                    : api.post("/buses", values);

                request
                    .then(() => {
                        resetForm();
                        onSuccess();
                    })
                    .catch((err) => {
                        console.error(err);
                        alert(
                            isEdit
                                ? "Грешка при редактиране на автобус"
                                : "Грешка при създаване на автобус"
                        );
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{ marginBottom: "1rem" }}>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Номер</label>
                        <Field id="number" name="number" className="form-control" />
                        <ErrorMessage
                            name="number"
                            render={(msg) => <div className="form-text text-danger">{msg}</div>}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="carrier" className="form-label">Превозвач</label>
                        <Field id="carrier" name="carrier" className="form-control" />
                        <ErrorMessage
                            name="carrier"
                            render={(msg) => <div className="form-text text-danger">{msg}</div>}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="capacity" className="form-label">Капацитет</label>
                        <Field id="capacity" name="capacity" type="number" className="form-control" />
                        <ErrorMessage
                            name="capacity"
                            render={(msg) => <div className="form-text text-danger">{msg}</div>}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="isActive" className="d-flex align-items-center gap-2">
                            <Field id="isActive" name="isActive" type="checkbox" />
                            Активен
                        </label>
                        <ErrorMessage
                            name="isActive"
                            render={(msg) => <div className="form-text text-danger">{msg}</div>}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-lg btn-primary rounded-pill px-4 shadow-sm"
                    >
                        {isEdit ? "Запази промените" : "Добави автобус"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default BusForm;
