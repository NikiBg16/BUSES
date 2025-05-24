// src/components/RouteForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import type { Route } from "./RouteList";

interface Values {
    name: string;
}

const RouteSchema = Yup.object().shape({
    name: Yup.string().required("Името е задължително"),
});

interface Props {
    onSuccess: () => void;
    initialData?: Route;
}

const RouteForm: React.FC<Props> = ({ onSuccess, initialData }) => {
    const isEdit = Boolean(initialData);
    const initialValues: Values = initialData
        ? { name: initialData.name }
        : { name: "" };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={RouteSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const req = isEdit
                    ? api.put(`/routes/${initialData!.id}`, values)
                    : api.post("/routes", values);

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
                        <label htmlFor="name">Име на маршрут</label>
                        <Field id="name" name="name" />
                        <ErrorMessage
                            name="name"
                            render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isEdit ? "Запази" : "Добави маршрут"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RouteForm;
