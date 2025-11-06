import useSidebar from "../../hooks/useSidebar";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import SidebarBookCard from "./SidebarBookCard";
import { defaultButtonLayout } from "../../utils/classNameUtils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookTitle } from "../../features/currentBook/currentBookSelectors";
import { selectUserProfileStoredBooks } from "../../features/userProfile/userProfileSelectors";
import { auth } from "../../firebase-config";
import type { LoadingUserProps } from "../../types/props";
import type { BookItem } from "../../types/books";

const Sidebar = ({ isLoadingUser }: LoadingUserProps) => {

    const currentBookTitle = useAppSelector(selectCurrentBookTitle);
    const storedBooks = useAppSelector(selectUserProfileStoredBooks);

    const { hideSidebarInMobile, removeMode, setRemoveMode } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return(

        <section className="h-full grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] px-2 py-6 gap-6">
   
            <article>
                <div className="pb-4">
                    <p className="text-gray-400 text-sm">Username:</p>
                    {isLoadingUser && <p className="text-white">Loading username...</p>}
                    {!isLoadingUser && <p className="text-white font-semibold">{auth.currentUser?.displayName}</p>}
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Active room:</p>
                    {isLoadingUser && <p className="text-white">Loading room...</p>}
                    {!isLoadingUser && <p className="text-white font-semibold">{currentBookTitle || "none"}</p>}
                </div>
            </article>

            <article>
                <button 
                    onClick={() => {
                        hideSidebarInMobile();
                        switchContent("bookSearch");
                    }}
                    className={`${defaultButtonLayout()}`}>
                    Search books
                </button>
            </article>
            <ul className="flex
                    flex-col
                    justify-start
                    gap-2
                    overflow-y-auto 
                    scrollbar"
                >

                {storedBooks.map((storedBook: BookItem, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        cardStoredBook={storedBook}
                        removeMode={removeMode}
                    /> 
                )}

                <li className="text-main-color text-xs text-center row-span-1 px-4 py-1 h-6">
                    {storedBooks.length < 4 && 
                        <div>{`Stored ${storedBooks.length}/4.`}</div>
                    }
                    {!storedBooks.length && 
                        <div>Start searching books.</div>
                    }
                    {storedBooks.length && 
                        <div>
                            <button
                                className={`${removeMode ? "text-red-500" : "text-main-color"} md:hover:text-white cursor-pointer px-3`}
                                onClick={() => {
                                    setRemoveMode(!removeMode);
                                }}
                            >
                                Click here to remove
                            </button>
                        </div>
                    }
                </li>
            </ul>

            <article className="grid grid-cols-1 gap-2">
                <div className="row-span-1">
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={() => {
                            hideSidebarInMobile();
                            switchContent("userSettings");
                        }}>
                        Settings
                    </button>
                </div>
                <div className="row-span-1">
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={() => {
                            hideSidebarInMobile();
                            switchContent("aboutSection");
                        }}>
                        About
                    </button>
                </div>
            </article>
        </section>
    )

}

export default Sidebar
