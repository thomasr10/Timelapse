import type { RegisterFormType, LoginFormType } from "../types/auth";

export const registerUser = async (values: RegisterFormType) => {
    const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });

    const data = await response.json();

    return { response, data }
}

export const login = async (values: LoginFormType) => {
    const response = await fetch('http://localhost:8080/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return { response, data }
}

export const me = async () => {

    const response = await fetch('http://localhost:8080/api/me', {
        credentials: 'include'
    });

    if (!response.ok) {
        console.log(`Erreur lors de la récupération du token : ${response.status}`);
        return null;
    }

    return response.json();

}

export const logout = async () => {

    const response = await fetch('http://localhost:8080/api/logout');

    if (!response.ok) {
        console.error(`Erreur lors de la déconnexion : ${response.status}`);
        return;
    }

    return;
}