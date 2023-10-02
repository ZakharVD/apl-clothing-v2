export function formatUserName(username: string) {
    const name = username.trimStart();
    const newUsername = []
    for (let i = 0; i < name.length; i++) {
        if (i === 0) {
            newUsername.push(name[i].toUpperCase());
            i++;
        }
        newUsername.push(name[i].toLowerCase())
    }
    return newUsername.join("").trim();
    return newUsername.join("").trim();
}