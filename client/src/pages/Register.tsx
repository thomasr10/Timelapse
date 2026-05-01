import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from 'formik';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerUser } from "../api/auth";
import type { RegisterFormType } from "../types/auth";
import { registerSchema } from "../types/auth";

const initialValues: RegisterFormType = {
    username: "",
    email: "",
    password: ""
}

export default function Register() {

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (values: RegisterFormType, { setErrors }: FormikHelpers<RegisterFormType>) => {

        setError(null);

        try {

            const { response, data } = await registerUser(values);

            if (!response.ok) {
                if (data.field) {
                    setErrors({ [data.field]: data.message })
                } else {
                    setError(data.message);
                    console.error(`Erreur serveur : ${response.status}`);
                }
            } else {
                navigate('/login');
            }

        } catch (e) {
            setError("Une erreur réseau est survenue, veuillez réessayer.");
            console.error(e);
        }
    }

    return (
        <>
            <h1>Bienvenue sur Timelapse</h1>
            <main>
                <Formik<RegisterFormType>
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(registerSchema)}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {
                                error && (
                                    <div className="form-error-message">
                                        <p>{error}</p>
                                    </div>
                                )
                            }
                            <div className="input-container">
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="JohnDoe"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="input-error-message"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="email">Adresse email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="john.doe@mail.com"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="input-error-message"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password">Mot de passe</label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Votre mot de passe"
                                />
                                <div className="password-information">
                                    <p>Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule et un caractère spécial.</p>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="input-error-message"
                                />
                            </div>
                            <div className="submit-container">
                                <button type="submit" disabled={isSubmitting}>
                                    Commencer votre aventure
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    )
}