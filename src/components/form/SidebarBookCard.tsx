import useSidebar from "../../hooks/useSidebar";
import { showHideAnything } from "../../utils/classNameUtils";
import type { OnlyStringChildrenProps } from "../../types/props";

const SidebarBookCard = ({ children }: OnlyStringChildrenProps) => {

  const count = 3;
  
  const { handleBookCardClick } = useSidebar();

  return (
    <li className="flex justify-center items-center border-2 row-span-1 bg-white">
        <button 
          onClick={() => {handleBookCardClick(children)}}
          className="md:flex md:justify-between p-3 cursor-pointer">
            <div className="mr-2">
                Chat room for: 
            </div>
            <div className="font-bold mr-4">
                {children}
            </div>
            <div className={`
                    ${showHideAnything(count)}
                    flex
                    justify-center
                    items-center
                    rounded-full
                    bg-red-500
                    h-5
                    w-5`}>
              {count}
            </div>
        </button>
    </li>
  )
}

export default SidebarBookCard;