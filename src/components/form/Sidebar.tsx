import useSidebar from "../../hooks/useSidebar";
import usePageNavigation from "../../hooks/usePageNavigation";
import SidebarBookCard from "../ui/SidebarBookCard";
import { defaultButtonLayout, setCursorPointer } from "../../utils/classNameUtils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookTitle } from "../../features/currentBook/currentBookSelectors";
import {
    selectUserProfileStoredBooks, 
    selectUserProfilePremium 
} from "../../features/userProfile/userProfileSelectors";
import { auth } from "../../firebase-config";
import type { BookItem } from "../../types/booksTypes";

const Sidebar = () => {

    const userProfileUsername: string | null | undefined = auth.currentUser?.displayName;
    const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
    const storedBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const { openChat, hideSidebarInMobile, removeMode, setRemoveMode, getActiveBooks } = useSidebar();
    const { navigateToSearch, navigateToActive, navigateToSettings, navigateToAbout } = usePageNavigation();

    return(
        <section className="h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] px-2 py-5 gap-6">
            <article className="flex flex-col gap-3">
                <div className="">
                    <p className="text-main-color text-sm">Username:</p>
                    {!userProfileUsername && <p className="text-white">Username not found</p>}
                    {<p className="text-white font-semibold">{userProfileUsername}</p>}
                </div>
                    {!currentBookTitle && 
                        <div className="">
                            <p className="text-main-color text-sm text-left">No active room!</p>
                            <div 
                                className={`${setCursorPointer(currentBookTitle)} text-left text-white`} 
                            >
                                <div>Please search a book...</div>
                            </div>
                        </div>}
                    {currentBookTitle && 
                        <div className="">
                            <p className="text-main-color text-sm text-left">Active room:</p>
                            <button 
                                className={`${setCursorPointer(currentBookTitle)} text-left text-white hover:text-main-color`} 
                                onClick={() => {
                                    openChat(currentBookTitle);
                                    hideSidebarInMobile();
                                }}
                            >
                                <div>{currentBookTitle}</div>
                            </button>
                        </div>}
                <div className="grid grid-cols-2 grid-rows-1 gap-2">
                    <div className="text-main-color text-sm col-span-2">
                        Search books...
                    </div>
                    <button
                        onClick={() => {
                            hideSidebarInMobile();
                            navigateToSearch();
                        }}
                        className={`${defaultButtonLayout()}`}>
                        All
                    </button>
                    <button 
                        onClick={() => {
                            getActiveBooks(isPremiumUser);
                            hideSidebarInMobile(isPremiumUser);
                            navigateToActive();
                        }}
                        className={`${defaultButtonLayout(isPremiumUser)}`}>
                        Active
                    </button>
                </div>
            </article>

            <ul className="overflow-y-auto scrollbar">

                {!isPremiumUser && 
                    <li className="
                        min-h-[50px]
                        bg-default-bg border-2
                        border-main-color
                        text-main-color 
                        h-full
                        w-full
                        flex 
                        justify-between
                        items-center
                        px-4
                        py-2
                        rounded-2xl
                        italic
                    ">
                        Upgrade to premium to unlock powerful search! Instantly find books with active chats. 
                        You'll also get to save up to three favorite chats right here in the sidebar.
                    </li>
                }

                {isPremiumUser && storedBooks.map((storedBook: BookItem) => {
                    const bookId: string = storedBook.id
                    return <SidebarBookCard 
                        key={bookId}
                        cardStoredBook={storedBook}
                        removeMode={removeMode}
                    /> 
                })}

                {isPremiumUser && <li className="text-main-color text-xs text-center row-span-1 px-4 py-1 h-6">
                    {!storedBooks.length && 
                        <div>No books stored.</div>
                    }
                    {storedBooks.length > 0 && 
                        <section className="flex flex-col justify-around items-center gap-2">
                            <div>
                                {`Stored ${storedBooks.length}/5.`}
                            </div>
                            <button
                                className={`
                                    ${removeMode 
                                    ? "text-white border-red-500" 
                                    : "text-main-color border-main-color "} 
                                        border rounded-3xl p-1 md:hover:text-white cursor-pointer px-3 w-80/100`}
                                onClick={() => {
                                    setRemoveMode(!removeMode);
                                }}
                            >
                                {removeMode ? "Cancel" : "Remove from sidebar"}
                            </button>
                        </section>
                    }
                </li>}
            </ul>

            <article className="grid grid-cols-1 gap-2">
                <div className="row-span-1">
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={() => {
                            hideSidebarInMobile();
                            navigateToSettings();
                        }}>
                        User settings
                    </button>
                </div>
                <div className="row-span-1">
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={() => {
                            hideSidebarInMobile();
                            navigateToAbout();
                        }}>
                        About
                    </button>
                </div>
            </article>
        </section>
    )

}

export default Sidebar
