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

const fakeUsersData: FakeUser[] = [
    {
        username: "name",
        books: ["Harry Potter", "Hamlet", "Ésser i temps", "La voluntat de poder"]
    }
]

const gridCols = `grid-cols-${fakeUsersData[0].books.length}`;

const Sidebar = () => {

    const { logout } = useAuth();
    const { user, isLoading } = useAuthUser();
    const { hideSidebarInMobile } = useSidebar();
    const { switchContent } = useMainContentRouter();

    return (
        <section className="h-full grid grid-cols-1 justify-around p-2 gap-2">
            <article className="p-2 border-2 border-white bg-gray-900 text-white row-span-1">
                Username:
                {isLoading && <p>Loading username...</p>}
                {!isLoading && <p className="font-bold">{user?.displayName}</p>}
            </article>
            <ul className={`grid ${gridCols} gap-2 row-span-3`}>
                {fakeUsersData[0].books.map((book: string, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        user={user}>
                        {book}
                    </SidebarBookCard>
                )}
            </ul>
            <article className="row-span-1 grid grid-cols-1">
                <div className="row-span-1">
                    <Button onClick={() => {
                        hideSidebarInMobile();
                        switchContent("search");
                    }}>
                        Add books
                    </Button> 
                </div>
                <div className="row-span-1">
                    <Button onClick={() => {
                        hideSidebarInMobile();
                        switchContent("settings");
                    }}>
                        Settings
                    </Button>
                </div>
                <div className="row-span-1">
                    <Button onClick={() => {
                        hideSidebarInMobile();
                        switchContent("");
                        logout();
                    }}>
                        Sign Out
                    </Button> 
                </div>
            </article>
            
        </section>
    )
}

export default Sidebar
