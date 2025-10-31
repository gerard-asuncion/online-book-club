import type { OnlyReactNodeChildrenProps } from '../../types/props'

const MainContentFrame = ({ children }: OnlyReactNodeChildrenProps) => {

  return (
    <section className="flex flex-col h-full bg-gray-900">
        {children}
    </section>
  )
}

export default MainContentFrame;
