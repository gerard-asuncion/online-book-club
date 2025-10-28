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

const Sidebar = ({ setOpenSidebar, setBookRoom, mdBreakpoint }: SidebarProps) => {

    const { userSignOut } = useAuth()

    const hideSidebar = (): void => {
        if(window.innerWidth < mdBreakpoint){
            setOpenSidebar(false);
        }
    }

    return (
        <div className="h-full flex flex-col justify-around p-2">
            <section className="border-2 p-3 bg-white">
                Username: 
                <div className="font-bold">
                    {fakeUsersData[0].username}
                </div>
            </section>
            <ul className={`grid ${gridCols} gap-2`}>
                {fakeUsersData[0].books.map((book: string, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        setBookRoom={setBookRoom}
                        hideSidebar={hideSidebar}
                        >
                        {book}
                    </SidebarBookCard>
                )}
            </ul>
            <Button onClick={userSignOut}>
                Sign Out
            </Button>
        </div>
    )
}

export default Sidebar
