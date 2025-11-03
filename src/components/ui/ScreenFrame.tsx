import type { ScreenFrameProps } from "../../types/props"

const ScreenFrame = ({ children, page }: ScreenFrameProps) => {

  if(page === "center"){
    return (
      <div className="h-dvh flex items-center justify-center w-screen bg-default-bg">
        {children}
      </div>
    )
  } else if(page === "full"){
    return (
      <div className="h-dvh flex flex-col overflow-hidden bg-default-bg">
        {children}
      </div>
    )
  } else {
    return (
      <div className="bg-default-bg">
        {children}
      </div>
    )
  }
}

export default ScreenFrame;
