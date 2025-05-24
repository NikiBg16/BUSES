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
                    <div>
                        <label>Име</label>
                        <Field name="name" />
                        <ErrorMessage name="name" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
                    </div>
                    <div>
                        <label>Адрес</label>
                        <Field name="address" />
                        <ErrorMessage name="address" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
                    </div>
                    <div>
                        <label>Ширина</label>
                        <Field name="latitude" type="number" />
                        <ErrorMessage name="latitude" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
                    </div>
                    <div>
                        <label>Дължина</label>
                        <Field name="longitude" type="number" />
                        <ErrorMessage name="longitude" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isEdit ? "Запази промените" : "Добави спирка"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default StopForm;
