import type { RegisterFormType } from "../types/auth";

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