import { useEffect } from "react";
import MainContentFrame from "../ui/MainContentFrame"
import useActiveBooksGrid from "../../hooks/useActiveBooksGrid";
import { 
  defaultButtonLayout, 
  justifyBooksGrid, 
  showHideAnything
} from "../../utils/classNameUtils";
import type { BookItem } from "../../types/booksTypes";
import useBooksGrid from "../../hooks/useBooksGrid";

const ActiveBooksGrid = () => {

  const { 
    allActiveBooksStatus, 
    allActiveBooksError, 
    getActiveBooks, 
    search, 
    setSearch, 
    handleActiveBooksSearch, 
    showResults
  } = useActiveBooksGrid();

  const { handleVolumeSelection } = useBooksGrid();

  const results: BookItem[] = showResults()

  useEffect(() => {
    getActiveBooks();
  }, [])

  return (
    <MainContentFrame>
      <section className={`${justifyBooksGrid(false)} flex flex-col items-center h-full w-full`}>
        <form 
          onSubmit={(e) => {handleActiveBooksSearch(e, search);}}
          className={`
            p-15
            flex
            gap-6
            max-w-xs
            md:max-w-xl
            shrink-0
          `}
        >
          <input 
            type="text" 
            name="searchInput" 
            id="searchInput"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search a book..."
            className={`
              w-full
              max-h-10
              p-4
              rounded-full 
              text-center
              text-sm
              text-black
              bg-white
              focus:outline-none
            `}            
          />
          <button 
              type="submit"
              className={`${defaultButtonLayout()} w-full md:w-auto max-h-10 text-sm md:col-span-1 md:row-span-1`}>
            Search
          </button>
        </form>
        
        <article
          className={`
            ${showHideAnything(true)}
            flex
            flex-col
            justify-around
            text-white
            gap-10 
            px-2
            max-w-95/100 m-auto
            max-h-95/100
            flex-1
            min-h-0
            overflow-y-auto
            scrollbar
          `}>
            <ul className="grid grid-cols-2 md:grid-cols-5">
              {allActiveBooksStatus === "loading" && <li>Loading...</li>}
              {allActiveBooksError && <li>{allActiveBooksError}</li>}
              {results.map((book: BookItem) => (
                <li 
                  className="col-span-1 mb-10 flex flex-col items-center"
                  key={book.id}
                >
                    <button 
                      onClick={() => {
                        handleVolumeSelection(book.id, book.volumeInfo.title, book.volumeInfo.authors);
                      }} 
                      className="cursor-pointer flex flex-col justify-center items-start gap-1 w-70/100 aspect-2/3"
                    >
                      <img
                      className="w-full h-full object-cover"
                      src={book.volumeInfo.imageLinks?.thumbnail} 
                      alt={book.volumeInfo.title} 
                    />
                    <div className="text-left">
                      <strong>{book.volumeInfo.title}</strong>
                      <p
                        className="text-main-color"
                      >
                        {book.volumeInfo.authors?.join(', ')}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
        </article>
      </section>
    </MainContentFrame>
  )
}

export default ActiveBooksGrid;
