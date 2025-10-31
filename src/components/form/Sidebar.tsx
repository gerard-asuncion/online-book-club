import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import useAuthUser from "../../hooks/useAuthUser";
import useSidebar from "../../hooks/useSidebar";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import SidebarBookCard from "./SidebarBookCard";

interface FakeUser {
    username: string,
    books: string[];
}

// "Antígona", "Història de Roma", "El petit príncep"

const fakeUsersData: FakeUser[] = [
    {
        username: "name",
        books: ["Antígona", "Harry Potter", "Història de Roma"]
    }
]

const totalBooks: number = fakeUsersData[0].books.length

const Sidebar = () => {

    const { logout } = useAuth();
    const { user, isLoading } = useAuthUser();
    const { hideSidebarInMobile } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return (
        <section className="h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] p-2 gap-2">
            <article className="p-2 border-2 border-white text-white">
                Username:
                {isLoading && <p>Loading username...</p>}
                {!isLoading && <p className="font-bold">{user?.displayName}</p>}
            </article>
            <ul className={`grid grid-cols-1 grid-rows-4 gap-2`}>
                {fakeUsersData[0].books.map((book: string, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        user={user}>
                        {book}
                    </SidebarBookCard>
                )}
                {totalBooks < 4 && 
                    <div className="row-span-1 h-full">
                        <button className="
                                    h-full
                                    w-full
                                    flex
                                    justify-center
                                    items-center
                                    rounded-2xl
                                    text-white
                                    font-semibold
                                    hover:border-2
                                    cursor-pointer">
                            Add a book
                        </button>
                    </div>}
            </ul>
            <article className="row-span-1 grid grid-cols-1 gap-2">   
                <div className="row-span-1 grid">
                    <div className="flex gap-2">
                        {totalBooks >= 4 &&
                            <Button onClick={() => {}}>
                                Remove Books
                            </Button>
                        }
                        <Button onClick={() => {
                            hideSidebarInMobile();
                            switchContent("settings");
                            }}>
                            Settings
                        </Button>
                    </div>
                </div>
                <div className="row-span-1">
                    <Button onClick={() => {
                        hideSidebarInMobile();
                        switchContent("");
                        logout();
                        }}>
                        Logout
                    </Button> 
                </div>
            </article>
        </section>
    )
}

export default Sidebar
