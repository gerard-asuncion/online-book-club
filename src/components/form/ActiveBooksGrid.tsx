import MainContentFrame from "../ui/MainContentFrame";
import GridBookCard from "../ui/GridBookCard";
import useActiveBooksGrid from "../../hooks/useActiveBooksGrid";
import { 
  defaultButtonLayout, 
  justifyBooksSection, 
  showHideAnything
} from "../../utils/classNameUtils";
import type { BookItem } from "../../types/booksTypes";

const ActiveBooksGrid = () => {

  const { 
    allActiveBooksStatus, 
    allActiveBooksError, 
    search, 
    setSearch,
    handleActiveBooksSearch, 
    showResults
  } = useActiveBooksGrid();

  const results: BookItem[] = showResults();

  return (
    <MainContentFrame>
      <section className={`${justifyBooksSection(false)} flex flex-col items-center h-full w-full`}>
        <form 
          onSubmit={(e) => {handleActiveBooksSearch(e, search);}}
          className={`
            p-10
            flex
            gap-6
            max-w-full
            md:max-w-2xl
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
                <GridBookCard currentBook={book} isChatHistorial={false} />
              ))}
            </ul>
        </article>
      </section>
    </MainContentFrame>
  )
}

export default ActiveBooksGrid;
