export const addTimeout = (callback: () => void, time: number): void => {
    setTimeout(callback, time);
};