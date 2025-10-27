import type { ButtonProps } from "../types/props"

const Button = ({children, onClick}: ButtonProps) => {
  return (
   <button
        className="
            w-full
            flex items-center justify-center 
            py-3 px-4 
            bg-white 
            border border-gray-300 
            rounded-lg 
            shadow-sm 
            text-gray-800 
            font-semibold 
            hover:bg-gray-50 
            transition-colors 
            duration-200 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-offset-2" 
        onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
