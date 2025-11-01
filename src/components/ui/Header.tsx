import useSidebar from "../../hooks/useSidebar";

const Header = () => {

  const { isOpenSidebar, showSidebar } = useSidebar();

  return (
    <header className="bg-green-800 p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center sm:px-8">      
        <h1 className="text-2xl font-bold text-white tracking-wider">
          ONLINE BOOK CLUB
        </h1>
        <button      
          onClick={() => showSidebar(!isOpenSidebar)}   
          className="p-2 rounded-full cursor-pointer">        
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
