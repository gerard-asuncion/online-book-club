import { useLocation } from "react-router-dom";
import useUserData from "./useUserData";
import usePageNavigation from "./usePageNavigation";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentBook, clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { selectUserProfilePremium } from "../features/userProfile/userProfileSelectors";
import useBooksGrid from "./useBooksGrid";

const useGridBookCard = () => {

    const { navigateToChat } = usePageNavigation();
    const { addBookToProfile } = useUserData();
    const { storeCheckboxState } = useBooksGrid();

    const location = useLocation();

    const dispatch = useAppDispatch();
    
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const handleVolumeSelection = (id: string, title: string, authors: string[]): void => {
        if(!isPremiumUser){
            const selectionConfirmed: boolean = globalThis.confirm(`Do you want to select the book "${title}"?`);
            if(!selectionConfirmed) return;
        }
        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({bookId: id, bookTitle: title, bookAuthors: authors}));
        if(storeCheckboxState){
            addBookToProfile(id);
        };
        if(location.pathname !== "/chat"){
            navigateToChat();
        };
        if(import.meta.env.DEV){
            console.log("Selected volume title: ", title);
            console.log("Selected volume ID :", id);
        }
    }

    
    const handleHistorialVolumeSelection = (id: string, title: string, authors: string[]): void => {
        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
        if(location.pathname !== "/chat"){
            navigateToChat();
        };
    }

    return { handleVolumeSelection, handleHistorialVolumeSelection }
}

export default useGridBookCard;
