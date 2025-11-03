import MainContentFrame from "../ui/MainContentFrame";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Search = () => {

  return (
    <MainContentFrame>
      <div className="h-full text-white font-bold text-lg flex justify-center items-center">
        <form 
          onSubmit={() => {}}
          className="flex flex-col gap-5"
        >
          <input 
            type="text" 
            name="searchInput" 
            id="searchInput"
            placeholder="search a book..."
            className="
              p-2  
              rounded-full 
              text-center
              text-sm
              text-black
              bg-white
              focus:outline-none
              focus:ring-4
            focus:ring-green-800"             
          />
          <button className={`${defaultButtonLayout()} text-sm`}>
            Search
          </button>
        </form>
      </div>
    </MainContentFrame>
  )
}

export default Search;
