export function checkLockStatus(date: string) {
    if (date !== null && Date.parse(date) > Date.now())
        return true;
    return false;
}