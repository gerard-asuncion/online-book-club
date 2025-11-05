import useSidebar from "../../hooks/useSidebar";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import SidebarBookCard from "./SidebarBookCard";
import { defaultButtonLayout } from "../../utils/classNameUtils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookTitle } from "../../features/currentBook/currentBookSelectors";
import { useState, useEffect } from "react";
import type { UserLoadingUserProps } from "../../types/props";

const Sidebar = ({ user, isLoadingUser }: UserLoadingUserProps) => {

    const [fakeBooksData, setFakeBooksData] = useState<string[]>([]);

    useEffect(() => {
        setFakeBooksData(["abc", "bcd", "cde", "def"]);
    }, []);

    const currentBookTitle = useAppSelector(selectCurrentBookTitle);

    const { hideSidebarInMobile } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return(

        <section className="h-full grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] px-2 py-6 gap-6">
   
            <article>
                <div className="pb-4">
                    <p className="text-gray-400 text-sm">Username:</p>
                    {isLoadingUser && <p className="text-white">Loading username...</p>}
                    {!isLoadingUser && <p className="text-white font-semibold">{user?.displayName}</p>}
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Active room:</p>
                    {isLoadingUser && <p className="text-white">Loading room...</p>}
                    {!isLoadingUser && <p className="text-white font-semibold">{currentBookTitle || "None"}</p>}
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
                    justify-center
                    gap-2
                    overflow-y-auto 
                    scrollbar"
                >

                {fakeBooksData.map((_, index: number) => {

                    const book = fakeBooksData[index];
                    
                    return book ? (
                    <SidebarBookCard 
                        key={index}
                        displayedBookId="book_id"
                        user={user}
                        >
                        {book}
                    </SidebarBookCard> ) : (

                        <li key={index} className="h-full min-h-[50px]"></li> 
                    );
                })}

                <li className="text-main-color text-xs text-center row-span-1 px-4 py-1 h-6">
                    {!fakeBooksData.length && 
                        <div>Start searching books.</div>
                    }
                    {fakeBooksData.length > 0 && fakeBooksData.length < 4 && 
                        <div>{`saved ${4 - fakeBooksData.length}/4`}</div>
                    }
                    {fakeBooksData.length === 4 && 
                        <div>
                            <button className="cursor-pointer px-3 text-main-color md:hover:text-white">
                                Remove
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
