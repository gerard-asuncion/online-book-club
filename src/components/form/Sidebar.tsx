import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import SidebarBookCard from "./SidebarBookCard";
import { auth } from '../../firebase-config'; 
import useSidebar from "../../hooks/useSidebar";

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

    const { userSignOut } = useAuth()

    return (
        <section className="h-full grid grid-col justify-around p-2">
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
                        >
                        {book}
                    </SidebarBookCard>
                )}
            </ul>
            <Button onClick={() => {}}>
                Settings
            </Button>
            <Button onClick={userSignOut}>
                Sign Out
            </Button>
        </section>
    )
}

export default Sidebar
