import useSidebar from "../../hooks/useSidebar";

const Header = () => {

  const { isOpenSidebar, showSidebar } = useSidebar();

  return (
    <header className="bg-white p-4 shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center sm:px-8">      
        <h1 className="text-2xl font-bold text-gray-800 tracking-wider">
          ONLINE BOOK CLUB
        </h1>
        <button      
          onClick={() => showSidebar(!isOpenSidebar)}   
          className="p-2 rounded-full text-gray-600 cursor-pointer">        
          <div className="flex flex-col space-y-1.5 w-6 h-5 justify-center items-center">
            <div className="w-5 h-2 bg-current rounded-full"></div> 
            <div className="w-5 h-2 bg-current rounded-full"></div>
            <div className="w-5 h-2 bg-current rounded-full"></div>
          </div>         
        </button>
      </div>
    </header>
  )
}

export default Header
