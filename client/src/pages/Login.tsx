import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "../types/auth";
import type { LoginFormType } from "../types/auth";
import { login } from "../api/auth";
import { useState } from "react";

const initialValues: LoginFormType = {
    email: "",
    password: ""
}

export default function Login() {

    const [error, setError] = useState< string | null >(null)

    const onSubmit = async (values: LoginFormType) => {
        setError(null);

        try {
            const { response, data } = await login(values);

            if(!response.ok) {
                setError(data.message);
                console.error(`Erreur lors de la connexion: ${response.status} => ${data.message}`);
            } else {
                alert('connecté');
            }
            
        } catch(e) {
            setError("Une erreur réseau est survenue, veuillez réessayer.");
            console.error(e);
        }
    }

    return (
        <>
            <h1>Bon retour parmi nous !</h1>
            <main>
                <Formik<LoginFormType>
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(loginSchema)}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {
                                error && (
                                    <div className="form-error-message">
                                        <p>{ error }</p>
                                    </div>
                                )
                            }
                            <div className="input-container">
                                <label htmlFor="email">Adresse email</label>
                                <Field
                                    name="email"
                                    type="text"
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
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="input-error-message"
                                />
                            </div>
                            <div className="submit-container">
                                <button type="submit" disabled={isSubmitting}>
                                    Se connecter
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    )
}