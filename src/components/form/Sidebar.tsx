import useAuthUser from "../../hooks/useAuthUser";
import useSidebar from "../../hooks/useSidebar";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import SidebarBookCard from "./SidebarBookCard";
import { defaultButtonLayout } from "../../utils/classNameUtils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookTitle } from "../../features/currentBook/currentBookSelectors";
import { useState, useEffect } from "react";

const Sidebar = () => {

    const [fakeBooksData, setFakeBooksData] = useState<string[]>([]);

    useEffect(() => {
        setFakeBooksData(["abc", "bcd"]);
    }, [])

    const currentBookTitle = useAppSelector(selectCurrentBookTitle);

    const { user, isLoading } = useAuthUser();
    const { hideSidebarInMobile } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return(// 1. AQUESTA ÉS LA SOLUCIÓ PRINCIPAL:
        // Definim 4 files: auto, auto, 1fr (flexible), auto
        // Afegim un 'gap' més gran per separar les 4 seccions
        <section className="h-full grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] px-2 py-6 gap-6">
            
            {/* Part 1: User / Active Room (Ocupa la 1a fila 'auto') */}
            <article>
                <p className="text-gray-400">Username:</p>
                {isLoading && <p className="text-white">Loading username...</p>}
                {!isLoading && <p className="text-white font-bold">{user?.displayName}</p>}

                {/* He afegit un petit espaiador */}
                <div className="h-4" /> 

                <p className="text-gray-400">Active room:</p>
                {isLoading && <p className="text-white">Loading room...</p>}
                {!isLoading && <p className="text-white font-bold">{currentBookTitle || "None"}</p>}
            </article>

            {/* Part 2: Search Button (Ocupa la 2a fila 'auto') */}
            <div>
                <button 
                    onClick={() => {
                        hideSidebarInMobile();
                        switchContent("bookSearch");
                    }}
                    className={`${defaultButtonLayout()}`}>
                    Search books
                </button>
            </div>

            {/* Part 3: Llista de Llibres (Ocupa la 3a fila '1fr' i fa scroll intern) */}
            {/* * Aquesta llista interna té 5 files:
              * 4 per a les ranures de llibres, 1 per al missatge.
            */}
            <ul className="grid grid-cols-1 grid-rows-5 gap-2 overflow-y-auto scrollbar">
                
                {/* 2. AQUESTA ÉS LA SOLUCIÓ PER ALS SLOTS FIXOS:
                  * Mapegem sobre les 4 "ranures"
                */}
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
                {/* Aquesta és la 5a fila de la llista, per al missatge/botó */}
                <li className="text-main-color text-xs text-center row-span-1 px-4 py-1 h-6">
                    {!fakeBooksData.length && 
                        <div>{`Start searching books.`}</div>
                    }
                    {fakeBooksData.length > 0 && 
                        <div>{`You can save ${4 - fakeBooksData.length} more books.`}</div>
                    }
                    {fakeBooksData.length === 4 && 
                        <div>
                            <button className="cursor-pointer px-3">
                                Click here to remove stored books
                            </button>
                        </div>
                    }
                </li>
            </ul>

            {/* Part 4: Settings / About (Ocupa la 4a fila 'auto', enganxat a baix) */}
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

    // return (
    //     <section className="h-full grid grid-cols-1 grid-rows-[auto_1fr_1fr_auto] px-2 py-6 gap-2">
    //         <article>
    //             <p className="text-gray-400">Username:</p>
    //             {isLoading && <p className="text-white">Loading username...</p>}
    //             {!isLoading && <p className="text-white font-bold">{user?.displayName}</p>}
    //         </article>
    //         <article>
    //                 <p className="text-gray-400">Active room:</p>
    //                 {isLoading && <p className="text-white">Loading room...</p>}
    //                 {!isLoading && <p className="text-white font-bold">{currentBookTitle}</p>}
    //             </article>
    //         <div className="row-span-1">
    //             <button 
    //                 onClick={() => {
    //                     hideSidebarInMobile();
    //                     switchContent("bookSearch");
    //                 }}
    //                 className={`${defaultButtonLayout()}`}>
    //                 Search books
    //             </button>
    //         </div>
    //         <ul className={`grid grid-cols-1 grid-rows-4 gap-2`}>
    //             {fakeBooksData.map((book: string, index: number) =>
    //                 <SidebarBookCard 
    //                     key={index}
    //                     displayedBookId="book_id"
    //                     user={user}
    //                     >
    //                     {book}
    //                 </SidebarBookCard>
    //             )}
    //             <li className="text-main-color text-xs text-center row-span-1 px-4 py-1 h-6">
    //                 {fakeBooksData.length < 4 && 
    //                     <div>{`You can save ${4 - fakeBooksData.length} more books.`}</div>}
    //                 {fakeBooksData.length === 4 && 
    //                     <div>
    //                         <button className="cursor-pointer border-main-color border-2 px-3">
    //                             Click here to remove stored books
    //                         </button>
    //                     </div>}
    //             </li>
    //         </ul>
    //         <article className="row-span-1 grid grid-cols-1 gap-2 pt-8">
    //             <div className="row-span-1">
    //                 <button 
    //                     className={`${defaultButtonLayout()}`}
    //                     onClick={() => {
    //                         hideSidebarInMobile();
    //                         switchContent("userSettings");
    //                     }}>
    //                     Settings
    //                 </button>
    //             </div>
    //             <div className="row-span-1">
    //                 <button 
    //                     className={`${defaultButtonLayout()}`}
    //                     onClick={() => {
    //                         hideSidebarInMobile();
    //                         switchContent("aboutSection");
    //                     }}>
    //                     About
    //                 </button>
    //             </div>
    //         </article>
    //     </section>
    // )
}

export default Sidebar
