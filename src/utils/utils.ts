export const addTimeout = (callback: () => {}, time: number): void => {
    setTimeout(callback, time);
};