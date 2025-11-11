import useUserData from "./useUserData";
import useMainContentRouter from "./useMainContentRouter";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentBook, clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { selectUserProfilePremium } from "../features/userProfile/userProfileSelectors";
import useBooksGrid from "./useBooksGrid";

const useGridBookCard = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { addBookToProfile } = useUserData();
    const { storeCheckboxState } = useBooksGrid();

    const dispatch = useAppDispatch();
    
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const handleVolumeSelection = (id: string, title: string, authors: string[]): void => {
        if(!isPremiumUser){
            const selectionConfirmed: boolean = window.confirm(`Do you want to select the book "${title}"?`);
            if(!selectionConfirmed) return;
        }
        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({bookId: id, bookTitle: title, bookAuthors: authors}));
        if(storeCheckboxState){
            addBookToProfile(id);
        };
        if(!isChat){
            switchContent("chatRoom");
        };
        if(import.meta.env.DEV){
            console.log('Selected volume title:', title);
            console.log('Selected volume ID:', id);
        }
    }

    
    const handleHistorialVolumeSelection = (id: string, title: string, authors: string[]): void => {

        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
        if(!isChat){
            switchContent("chatRoom");
        };
    }

    return { handleVolumeSelection, handleHistorialVolumeSelection }
}

export default useGridBookCard;
