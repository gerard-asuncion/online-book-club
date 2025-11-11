import { useLocation } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";
import { centerHeaderTitle, hideHeaderButton } from "../../utils/classNameUtils";

const Header = () => {

  const location = useLocation();

  const { handleHeaderButton } = useSidebar();

  return (
    <header className="bg-main-color p-2 lg:p-4 sticky top-0 z-10 shrink-0">
      <div className={`
        flex 
        ${centerHeaderTitle(location.pathname)}
        items-center sm:px-8 mx-1 md:ml-7 md:mr-0
      `}>      
        <h1 className="text-2xl font-bold text-white tracking-wider">
          ONLINE BOOK CLUB
        </h1>
        <button      
          onClick={handleHeaderButton}   
          className={`
            ${hideHeaderButton(location.pathname)}
            p-2
            rounded-full
            cursor-pointer`}>        
          <div className="flex flex-col space-y-1.5 w-6 h-5 justify-center items-center">
            <div className="w-5 h-2 bg-white rounded-full"></div> 
            <div className="w-5 h-2 bg-white rounded-full"></div>
            <div className="w-5 h-2 bg-white rounded-full"></div>
          </div>         
        </button>
      </div>
    </header>
  )
}

export default Header
