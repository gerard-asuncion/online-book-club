import type { ButtonProps } from "../../types/props"

const Button = ({children, onClick}: ButtonProps) => {
  return (
   <button
        className="
            w-full
            flex items-center justify-center 
            py-3 px-4 
            border-2
            border-green-800
            rounded-lg 
            shadow-sm 
            text-white
            font-semibold 
            hover:bg-white
            hover:text-black
            hover:border-white
            transition-colors 
            duration-200 
            cursor-pointer" 
        onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
