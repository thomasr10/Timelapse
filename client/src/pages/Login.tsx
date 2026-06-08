import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "../types/auth";
import type { LoginFormType } from "../types/auth";
import { login } from "../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";

const initialValues: LoginFormType = {
    email: "",
    password: ""
}

export default function Login() {

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { refreshUser } = useAuth();
    const { startFetch, endFetch, loadingCount } = useLoader();

    const onSubmit = async (values: LoginFormType) => {
        setError(null);
        startFetch();
        try {
            const { response, data } = await login(values);

            if (!response.ok) {
                setError(data.message);
                console.error(`Erreur lors de la connexion: ${response.status} => ${data.message}`);
            } else {
                await refreshUser();
                navigate('/');
            }

        } catch (e) {
            setError("Une erreur réseau est survenue, veuillez réessayer.");
            console.error(e);
        } finally {
            endFetch();
        }
    }

    return (loadingCount > 0 ? <Loader /> :
        <>
            <h1>Bon retour parmi <span className="accent">nous&nbsp;!</span></h1>
            <main className="section-container">
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
                                        <p>{error}</p>
                                    </div>
                                )
                            }
                            <div className="input-container">
                                <label htmlFor="email">Adresse email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    placeholder="john.doe@mail.com"
                                    id="email"
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
                                    id="password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="input-error-message"
                                />
                            </div>
                            <div className="submit-container">
                                <Button className="form-btn full-btn" type="submit" disabled={isSubmitting}>
                                    Se connecter
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    )
}