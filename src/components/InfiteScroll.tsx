import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react"

const InfiteScroll: FC<{
  children: ReactNode
  handler: () => void
  headerHandler: Dispatch<SetStateAction<boolean>>
  page: number
}> = ({ children, handler, headerHandler, page }) => {
  /* Infinite scrolling add*/
  useEffect(() => {
    /*Infinite scrolling handler*/
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 400) {
        handler()
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [handler, page])

  return <>{children}</>
}

export default InfiteScroll
