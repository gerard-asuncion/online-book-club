import MainContentFrame from "../ui/MainContentFrame";
import { 
  defaultButtonLayout, 
  justifyBooksSection,
  changeBooksGridFlexDirection, 
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
    storeCheckboxState,
    autoSaveBook,
    handleBooksSearch,
    handleLoadMoreBooks,
    handleVolumeSelection,
  } = useBooksGrid();

  const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

  return (
    <MainContentFrame>
      <section className={`${justifyBooksSection(!displayBooks)} flex flex-col items-center h-full w-full`}>
        <article className="flex flex-col justify-center items-center p-10 w-full">
          <form 
            onSubmit={(e) => {handleBooksSearch(e, query);}}
            className={`
              ${changeBooksGridFlexDirection(displayBooks)}
              flex
              flex-col
              gap-6
              shrink-0
              w-80/100
              md:w-50/100
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
                className={`${defaultButtonLayout()} w-full md:w-50/100 max-h-10 text-sm`}>
              Search
            </button>
            {isPremiumUser && 
              <div className="max-h-2 min-w-20/100 flex justify-center items-center gap-2">
                <input 
                  type="checkbox"
                  className="accent-main-color"
                  id="storeInSidebarCheckbox"
                  name="storeInSidebarCheckbox"
                  checked={storeCheckboxState} 
                  onChange={(e) => {
                    autoSaveBook(e.target.checked);
                  }}
                />
                <label 
                  htmlFor="storeInSidebarCheckbox"
                  className="text-white text-sm"
                >
                  Store in sidebar
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
              {booksStatus === "loading" && <li className="text-white">Loading...</li>}
              {booksError && <li className="text-white">{booksError}</li>}
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
