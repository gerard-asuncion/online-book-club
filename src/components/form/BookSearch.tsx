import MainContentFrame from "../ui/MainContentFrame";
import { defaultButtonLayout, setGridLayoutBookSearch } from "../../utils/classNameUtils";
import { useState } from "react";
import { showHideAnything, centerAnyContent } from "../../utils/classNameUtils";


const BookSearch = () => {

  const [displayBooks, setDisplayBooks] = useState<boolean>(false);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const books = ["book example", "book example", "book example", "book example", 
    "book example", "book example", "book example", "book example",
    "book example", "book example", "book example", "book example", 
    "book example", "book example", "book example", "book example"]

  const handleSubmitSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayBooks(true);
  }; 

  const testCheckbox = (checked: boolean): void => {
    setCheckboxState(checked);
  }

  return (
    <MainContentFrame>
      <section className={`${centerAnyContent(!displayBooks)} h-full w-full`}>
        <article className="flex flex-col justify-center items-center p-10">
          <form 
            onSubmit={handleSubmitSearch}
            className={`
              ${setGridLayoutBookSearch(displayBooks)} 
              grid
              gap-6
              max-w-xl  
              shrink-0
              w-full
              place-items-center
              `}
          >
            <input 
              type="text" 
              name="searchInput" 
              id="searchInput"
              placeholder="search a book..."
              className="
                max-h-10
                w-100
                col-span-3
                row-span-1
                p-4
                rounded-full 
                text-center
                text-sm
                text-black
                bg-white
                focus:outline-none"             
            />
            <button 
                type="submit"
                className={`${defaultButtonLayout()} max-h-10 text-sm col-span-1 row-span-1`}>
              Search
            </button>
            <div className="flex justify-center items-center gap-2 col-span-4 row-span-1">
              <input 
                type="checkbox"
                className=""
                id="activeRoomsCheckbox"
                name="activeRoomsCheckbox"
                checked={checkboxState} 
                onChange={(e) => {
                    testCheckbox(e.target.checked);
                }}
              />
              <label 
                htmlFor="activeRoomsCheckbox"
                className="text-white"
              >
                Active chats only
              </label>
            </div>
          </form>
        </article>
        <article className={`
            ${showHideAnything(displayBooks)}
            text-white 
            gap-10 
            px-2
            max-w-95/100 m-auto
            max-h-95/100
            h-full
            overflow-y-auto
            scrollbar
          `}>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {books.map((book: string, index: number) => {
              return  <li 
                        key={index}
                        className="col-span-1 flex flex-col"
                      >
                        <div className="
                          flex justify-center items-center 
                          border-3 border-main-color
                          h-80"
                        >
                          {book}
                        </div>
                        <div className="">Title...</div>
                        <div className="">Author...</div>
                      </li>
            })}  
          </ul>
        </article>
      </section>
    </MainContentFrame>
  )
}

export default BookSearch;
