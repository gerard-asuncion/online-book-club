import type { ScreenProps } from "../../types/props"

const Screen = ({ children, page }: ScreenProps) => {

  if(page == "center"){
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        {children}
      </div>
    )
  } else if(page == "full"){
    return (
      <div className="h-screen">
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

export default Screen
