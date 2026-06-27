export const formatUsername = (username: string | undefined) => {
    if (!username) return;

    return `@${username}`
}