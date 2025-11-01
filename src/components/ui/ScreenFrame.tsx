import type { ScreenFrameProps } from "../../types/props"

const ScreenFrame = ({ children, page }: ScreenFrameProps) => {

  if(page === "center"){
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        {children}
      </div>
    )
  } else if(page === "full"){
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gray-900">
        {children}
      </div>
    )
  } else {
    return (
      <div className="bg-gray-900">
        {children}
      </div>
    )
  }
}

export default ScreenFrame;
