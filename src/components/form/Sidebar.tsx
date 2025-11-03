import useAuth from "../../hooks/useAuth";
import useAuthUser from "../../hooks/useAuthUser";
import useSidebar from "../../hooks/useSidebar";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import SidebarBookCard from "./SidebarBookCard";
import { defaultButtonLayout } from "../../utils/classNameUtils";

interface FakeUser {
    username: string,
    books: Book[];
}

interface Book {
    title: string,
    author: string;
}

// "Antígona", "Història de Roma", "El petit príncep"

const fakeUsersData: FakeUser[] = [
    {
        username: "name",
        books: [{
                title: "Harry Potter",
                author: "JK Rowling"            
            },{
                title: "El petit príncep",
                author: "Antoine de Saint-Exupéry"
            },{
                title: "Història de Roma",
                author: "Polibi"
            }]
    }]

const totalBooks: number = fakeUsersData[0].books.length

const Sidebar = () => {

    const { logout } = useAuth();
    const { user, isLoading } = useAuthUser();
    const { hideSidebarInMobile } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return (
        <section className="h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] px-2 py-6 gap-2">
            <article className="pb-5">
                <p className="text-gray-400">Username:</p>
                {isLoading && <p className="text-white">Loading username...</p>}
                {!isLoading && <p className="text-white font-bold">{user?.displayName}</p>}
            </article>
            <ul className={`grid grid-cols-1 grid-rows-4 gap-2`}>
                {fakeUsersData[0].books.map((book: Book, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        user={user}
                        >
                        {book}
                    </SidebarBookCard>
                )}
                {totalBooks < 4 && 
                    <div className="row-span-1 h-full">
                        <button 
                            onClick={() => {
                                hideSidebarInMobile();
                                switchContent("bookSearch");
                            }}
                            className="
                                h-full
                                w-full
                                flex
                                justify-center
                                items-center
                                rounded-2xl
                                text-white
                                text-sm
                                border-2
                                border-gray-900
                                transition-colors 
                                ease-in-out
                                duration-200
                                active:border-green-800
                                md:hover:border-green-800
                                cursor-pointer">
                            Add a book
                        </button>
                    </div>}
            </ul>
            <article className="row-span-1 grid grid-cols-1 gap-2 pt-8">   
                <div className="row-span-1 grid">
                    <div className="flex gap-2">
                        <button 
                            className={`${defaultButtonLayout()}`}
                            onClick={() => {
                                hideSidebarInMobile();
                                switchContent("userSettings");
                            }}>
                            Settings
                        </button>
                    </div>
                </div>
                <div className="row-span-1">
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={() => {
                            hideSidebarInMobile();
                            switchContent("");
                            logout();
                        }}>
                        Log Out
                    </button> 
                </div>
            </article>
        </section>
    )
}

export default Sidebar
