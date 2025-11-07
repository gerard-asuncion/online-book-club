export const addTimeout = (callback: () => void, time: number): void => {
    setTimeout(callback, time);
};

export const detectDeletedUser = (username: string | null): string => {
    if (!username) {
        return "Deleted User";
    } else {
        return username;
    }
}
