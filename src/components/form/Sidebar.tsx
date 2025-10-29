import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import SidebarBookCard from "../ui/SidebarBookCard";
import { auth } from '../../firebase-config'; 
import type { SidebarProps } from "../../types/props";

interface FakeUser {
    username: string,
    books: string[];
}

const displayUserName = (): string => auth.currentUser?.displayName ? auth.currentUser.displayName : "Unknown User"

const fakeUsersData: FakeUser[] = [
    {
        username: displayUserName(),
        books: ["book1", "book2", "book3"]
    }
]

const gridCols = `grid-cols-${fakeUsersData[0].books.length}`;

const Sidebar = ({ setOpenSidebar, setBookRoom, setDisplayedWindow, mdBreakpoint }: SidebarProps) => {

    const { userSignOut } = useAuth()

    const hideSidebar = (): void => {
        if(window.innerWidth < mdBreakpoint){
            setOpenSidebar(false);
        }
    }

    return (
        <section className="h-full flex flex-col justify-around p-2">
            <article className="border-2 p-3 bg-white">
                Username:
                <div className="font-bold">
                    {fakeUsersData[0].username}
                </div>
            </article>
            <ul className={`grid ${gridCols} gap-2`}>
                {fakeUsersData[0].books.map((book: string, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        setBookRoom={setBookRoom}
                        setDisplayedWindow={setDisplayedWindow}
                        hideSidebar={hideSidebar}
                        >
                        {book}
                    </SidebarBookCard>
                )}
            </ul>
            <Button onClick={setDisplayedWindow("settings")}>
                Settings
            </Button>
            <Button onClick={userSignOut}>
                Sign Out
            </Button>
        </section>
    )
}

export default Sidebar
