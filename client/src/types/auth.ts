import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, "Le nom d'utilisateur est obligatoire").default(''),
    email: z.email("Vous devez saisir une adresse email valide").default(''),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/, 'Mot de passe invalide').min(12, "Le mot de passe doit contenir au moins 12 caractères").default('')
});

export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Vous devez saisir une adresse email valide").default(""),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/, 'Mot de passe invalide').min(12, "Le mot de passe doit contenir au moins 12 caractères").default('')
});

export type LoginFormType = z.infer<typeof loginSchema>;

export type User = {
    id: number,
    email: string,
    username: string,
    display_username: string,
    profile_picture: string
}

export type AuthContextType = {
    isAuth: boolean,
    user: User | null,
    isLoading: boolean,
    refreshUser: () => void
}
