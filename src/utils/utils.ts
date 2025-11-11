export const addTimeout = (callback: () => void, time: number): void => {
    setTimeout(callback, time);
};

export const detectDeletedUser = (username: string | null | undefined): string =>
    username || "deleted user";

export const bookCardTitle = (title : string | undefined): string => {
    if(!title) return "Unknown Title";
    return title;
}

export const bookCardAuthors = (authorsArr : string[] | undefined): string => {
    if(!authorsArr || authorsArr.length === 0) return "Unknown Author";
    return authorsArr.join(", ");
}

export const compareArrayItems = (arrayA: string[], arrayB: string[]): boolean => {

  if (arrayA.length !== arrayB.length) return false;

  const sortedArrayA = [...arrayA].sort();
  const sortedArrayB = [...arrayB].sort();

  for (let i = 0; i < sortedArrayA.length; i++) {
    if (sortedArrayA[i] !== sortedArrayB[i]) return false;
  }

  return true;
}