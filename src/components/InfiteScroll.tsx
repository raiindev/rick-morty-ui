import { FC, ReactNode, useEffect } from "react"

const InfiteScroll: FC<{ children: ReactNode; handler: () => void; page: number }> = ({ children, handler, page }) => {
  /*Infinite scrolling handler*/
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      handler()
    }
  }

  /* Infinite scrolling add*/
  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [page])

  return <>{children}</>
}

export default InfiteScroll
