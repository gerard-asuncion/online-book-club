import MainContentFrame from "../ui/MainContentFrame";
import { defaultButtonLayout, setBooksGridLayout } from "../../utils/classNameUtils";
import { useState } from "react";
import useBooksGrid from "../../hooks/useBooksGrid";
import { showHideAnything, centerAnyContent } from "../../utils/classNameUtils";
import type { BookItem } from "../../types/books";


const BooksGrid = () => {

  const { query, setQuery, displayBooks, booksVolumes, handleBooksSearch } = useBooksGrid();

  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const testCheckbox = (checked: boolean): void => {
    setCheckboxState(checked);
  }

  return (
    <MainContentFrame>
      <section className={`${centerAnyContent(!displayBooks)} h-full w-full`}>
        <article className="flex flex-col justify-center items-center p-10">
          <form 
            onSubmit={(e) => {handleBooksSearch(e, query);}}
            className={`
              ${setBooksGridLayout(displayBooks)} 
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
              onChange={(e) => setQuery(e.target.value)}
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
            <ul>
    {booksVolumes.map((book: BookItem) => (
      <li key={book.id}>
        {/*
          * Com que 'imageLinks' és opcional, fem servir '?.'.
          * Si 'imageLinks' és undefined, tot es talla 
          * i no intentarà llegir 'thumbnail', evitant un crash.
        */}
        <img 
          src={book.volumeInfo.imageLinks?.thumbnail} 
          alt={book.volumeInfo.title} 
        />
        <strong>{book.volumeInfo.title}</strong>
        {/* Els autors també són un array, cal fer 'join' */}
        <p>{book.volumeInfo.authors?.join(', ')}</p>
      </li>
    ))}
  </ul>
          {/* <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {booksVolumes.map((book: string, index: number) => {
              return  <li 
                        key={index}
                        className="col-span-1 flex flex-col"
                      >
                        <div className="
                          flex justify-center items-center 
                          border-3 border-main-color
                          h-80"
                        >
                          "cover"
                        </div>
                        <div>{book.volumeInfo.title}</div>
                        <div className="text-main-color">{book.volumeInfo.authors}</div>
                      </li>
            })}  
          </ul> */}
        </article>
      </section>
    </MainContentFrame>
  )
}

export default BooksGrid;
