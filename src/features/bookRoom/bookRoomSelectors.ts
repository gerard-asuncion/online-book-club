import type { RootState } from '../../app/store';

export const selectBookRoom = (state: RootState): string => state.bookRoom.bookRoom;

export const selectLastViewedKey = (state: RootState): string => state.bookRoom.lastViewedKey;
export const selectLastViewedDate = (state: RootState): number => state.bookRoom.lastViewedDate;
export const selectUnreadMessagesCount = (state: RootState): number => state.bookRoom.unreadMessagesCount;