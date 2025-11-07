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

export const bookCardTitle = (title : string | undefined): string => {
    if(!title) return "Unknown Title";
    return title;
}

export const bookCardAuthors = (authorsArr : string[] | undefined): string => {
    if(!authorsArr || authorsArr.length === 0) return "Unknown Author";
    return authorsArr.join(", ");
}