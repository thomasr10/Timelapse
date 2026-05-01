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
        body: JSON.stringify(values)
    });

    const data = await response.json();
    
    return { response, data }
}