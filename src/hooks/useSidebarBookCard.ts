import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useAppSelector } from '../app/hooks';
import { fetchStoredBooks } from '../features/userProfile/userProfileSlice';
import { selectCurrentBookId } from '../features/currentBook/currentBookSelectors';
import type { BookItem } from '../types/books';

const useSidebarBookCard = (cardBookId: string) => {


}

export default useSidebarBookCard;
