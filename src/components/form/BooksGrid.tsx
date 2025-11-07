import MainContentFrame from "../ui/MainContentFrame";
import { 
  defaultButtonLayout, 
  justifyBooksGrid, 
  showHideAnything
} from "../../utils/classNameUtils";
import useBooksGrid from "../../hooks/useBooksGrid";
import { useAppSelector } from "../../app/hooks";
import { selectUserProfilePremium } from '../../features/userProfile/userProfileSelectors';
import type { BookItem } from "../../types/booksTypes";

const BooksGrid = () => {

  const { 
    query, 
    setQuery, 
    displayBooks, 
    booksVolumes, 
    booksStatus,
    booksError,
    checkboxState,
    autoSaveBook,
    handleBooksSearch,
    handleLoadMoreBooks,
    handleVolumeSelection,
  } = useBooksGrid();

  const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

  return (
    <MainContentFrame>
      <section className={`${justifyBooksGrid(!displayBooks)} flex flex-col items-center h-full w-full`}>
        <article className="flex flex-col justify-center items-center p-10">
          <form 
            onSubmit={(e) => {handleBooksSearch(e, query);}}
            className={`
              grid
              gap-6
              max-w-xs
              md:max-w-xl
              shrink-0
              w-full
              place-items-center
              grid-cols-1
              ${isPremiumUser ? 'md:grid-cols-4' : 'md:grid-cols-3'}
            `}
          >
            <input 
              type="text" 
              name="searchInput" 
              id="searchInput"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search a book..."
              className={`
                w-full
                ${isPremiumUser ? 'md:col-span-3 md:row-span-1' : 'md:col-span-2 md:row-span-1'}
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
            {isPremiumUser && 
              <div className="flex justify-center items-center gap-2 md:col-span-4 md:row-span-1">
                <input 
                  type="checkbox"
                  className="accent-main-color"
                  id="activeRoomsCheckbox"
                  name="activeRoomsCheckbox"
                  checked={checkboxState} 
                  onChange={(e) => {
                    autoSaveBook(e.target.checked);
                  }}
                />
                <label 
                  htmlFor="activeRoomsCheckbox"
                  className="text-white text-sm"
                >
                  Automatically store in sidebar
                </label>
              </div>
            }
          </form>
        </article>
        
        <article
          className={`
            ${showHideAnything(displayBooks)}
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
              {booksVolumes.map((book: BookItem) => (
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
            {booksStatus === "loading" && <div className="text-white">Loading...</div>}
            {booksError && <div className="text-white">{booksError}</div>}
            {booksStatus === 'succeeded' && booksVolumes.length > 0 && (
              <div className="flex justify-center col-span-full w-full mb-15">
                <button
                  type="button"
                  onClick={handleLoadMoreBooks}
                  className={`${defaultButtonLayout()} max-w-40 text-sm`}
                >
                  Load more
                </button>
              </div>
            )}
            {booksStatus === "loading-more" && <div className="text-white mb-20">Loading more books...</div>}
        </article>
      </section>
    </MainContentFrame>
  )
}

export default BooksGrid;
