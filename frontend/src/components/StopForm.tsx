// src/components/StopForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import type { Stop } from "./StopList";

interface Values {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

const StopSchema = Yup.object().shape({
    name: Yup.string().required("Името е задължително"),
    address: Yup.string().required("Адресът е задължителен"),
    latitude: Yup.number()
        .required("Ширината е задължителна")
        .min(-90, "Невалидна стойност")
        .max(90, "Невалидна стойност"),
    longitude: Yup.number()
        .required("Дължината е задължителна")
        .min(-180, "Невалидна стойност")
        .max(180, "Невалидна стойност"),
});

interface Props {
    onSuccess: () => void;
    initialData?: Stop;
}

const StopForm: React.FC<Props> = ({ onSuccess, initialData }) => {
    const isEdit = Boolean(initialData);
    const initialValues: Values = initialData
        ? {
            name: initialData.name,
            address: initialData.address,
            latitude: initialData.latitude,
            longitude: initialData.longitude,
        }
        : { name: "", address: "", latitude: 0, longitude: 0 };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={StopSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const req = isEdit
                    ? api.put(`/stops/${initialData!.id}`, values)
                    : api.post("/stops", values);

                req
                    .then(() => {
                        resetForm();
                        onSuccess();
                    })
                    .catch(() => alert(isEdit ? "Грешка при редакция" : "Грешка при създаване"))
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{ marginBottom: "1rem" }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Име</label>
                        <Field id="name" name="name" className="form-control" />
                        <ErrorMessage name="name" render={msg => <div className="form-text text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Адрес</label>
                        <Field id="address" name="address" className="form-control" />
                        <ErrorMessage name="address" render={msg => <div className="form-text text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="latitude" className="form-label">Ширина</label>
                        <Field id="latitude" name="latitude" type="number" className="form-control" />
                        <ErrorMessage name="latitude" render={msg => <div className="form-text text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Дължина</label>
                        <Field id="longitude" name="longitude" type="number" className="form-control" />
                        <ErrorMessage name="longitude" render={msg => <div className="form-text text-danger">{msg}</div>} />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn text-white fw-semibold px-4 py-2 rounded-pill shadow-sm"
                        style={{
                            background: "linear-gradient(90deg, #ff00cc, #3333ff)",
                            border: "none",
                            transition: "transform 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        {isEdit ? "Запази промените" : "Добави спирка"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default StopForm;
