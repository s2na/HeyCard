export function signIn({username}) {
    const user = username;
    if (user === undefined) throw new Error()
    return user
}