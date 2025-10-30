import type { RootState } from '../../app/store';

export const selectBookRoom = (state: RootState): string => state.bookRoom.bookRoom;