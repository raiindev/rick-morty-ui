import { FC, ReactNode, useEffect } from "react"

const InfiteScroll: FC<{ children: ReactNode; handler: () => void; page: number }> = ({ children, handler, page }) => {
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
