export const addTimeout = (callback: () => void, time: number): void => {
    setTimeout(callback, time);
};

export const detectDeletedUser = (username: string | null | undefined): string =>
    username
    ? username
    : "deleted user"

export const bookCardTitle = (title : string | undefined): string => {
    if(!title) return "Unknown Title";
    return title;
}

export const bookCardAuthors = (authorsArr : string[] | undefined): string => {
    if(!authorsArr || authorsArr.length === 0) return "Unknown Author";
    return authorsArr.join(", ");
}