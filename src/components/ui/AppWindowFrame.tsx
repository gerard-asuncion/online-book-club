import type { OnlyReactNodeChildrenProps } from '../../types/props'

const AppWindowFrame = ({ children }: OnlyReactNodeChildrenProps) => {

  return (
    <section className="flex flex-col h-full bg-amber-400">
        {children}
    </section>
  )
}

export default AppWindowFrame;
