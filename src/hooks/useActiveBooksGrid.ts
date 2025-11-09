import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectGoogleBooksVolumes, selectGoogleBooksStatus, selectGoogleBooksError } from '../features/googleBooks/googleBooksSelectors';
import type { BookItem } from '../types/booksTypes';
import useSidebar from './useSidebar';

const useActiveBooksGrid = () => {

    const { resultsActiveBooks, setResultsActiveBooks } = useSidebar();

    const allActiveBooks: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
    const allActiveBooksStatus: string = useAppSelector(selectGoogleBooksStatus);
    const allActiveBooksError: string | null = useAppSelector(selectGoogleBooksError);

    const [search, setSearch] = useState<string>("");

    const showResults = (): BookItem[] => {
        if(!resultsActiveBooks || !resultsActiveBooks.length){
            return allActiveBooks;
        }else{
            return resultsActiveBooks;
        }
    }

    const handleActiveBooksSearch = (e: React.FormEvent, search: string): void => {
        e.preventDefault();
        if(!search.trim()) return;
        const foundTitles: BookItem[] = allActiveBooks.filter(book => book.volumeInfo.title.toLowerCase().includes(search.toLowerCase()))
        const foundAuthors: BookItem[] = allActiveBooks.filter(book => book.volumeInfo.authors?.some(author => author.toLowerCase().includes(search.toLowerCase())));
        const foundBooks: BookItem[] = [...new Set([...foundTitles, ...foundAuthors])]
        if(!foundBooks.length) alert("No books were found matching this search.");
        setResultsActiveBooks(foundBooks);
    }
    
    return { allActiveBooks, allActiveBooksStatus, allActiveBooksError, search, setSearch, handleActiveBooksSearch, showResults }
}

export default useActiveBooksGrid;
