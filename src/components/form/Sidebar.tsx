import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import useSidebar from "../../hooks/useSidebar";
import SidebarBookCard from "./SidebarBookCard";
import { auth } from '../../firebase-config'; 

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

const Sidebar = () => {

    const { userSignOut } = useAuth();
    const { hideSidebarInMobile } = useSidebar();

    return (
        <section className="h-full grid grid-cols-1 justify-around p-2 gap-2">
            <article className="border-2 p-2 bg-white row-span-1">
                Username:
                <h2 className="font-bold">
                    {fakeUsersData[0].username}
                </h2>
            </article>
            <ul className={`grid ${gridCols} p-2 gap-2 row-span-3`}>
                {fakeUsersData[0].books.map((book: string, index: number) =>
                    <SidebarBookCard 
                        key={index}
                        >
                        {book}
                    </SidebarBookCard>
                )}
            </ul>
            <div className="row-span-1">
                <Button onClick={() => {
                    hideSidebarInMobile();
                }}>
                    Add books
                </Button> 
            </div>
            <div className="row-span-1">
                <Button onClick={() => {
                     hideSidebarInMobile();
                }}>
                    Settings
                </Button>
            </div>
            <div className="row-span-1">
                <Button onClick={() => {
                     hideSidebarInMobile();
                     userSignOut();
                }}>
                    Sign Out
                </Button> 
            </div>
        </section>
    )
}

export default Sidebar
