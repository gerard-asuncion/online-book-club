import type { ScreenFrameProps } from "../../types/props"

const ScreenFrame = ({ children, page }: ScreenFrameProps) => {

  if(page === "center"){
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        {children}
      </div>
    )
  } else if(page === "full"){
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {children}
      </div>
    )
  } else {
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default ScreenFrame;
