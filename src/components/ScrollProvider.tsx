import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react"

const ScrollProvider: FC<{
  children: ReactNode
  handler: () => void
  header: { visibility: string; setter: Dispatch<SetStateAction<string>> }
  page: number
}> = ({ children, handler, header, page }) => {
  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const onScroll = () => {
      const scrollY = window.pageYOffset
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const direction = scrollY > lastScrollY ? "down" : "up"

      if (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10) {
        if (scrollTop <= 300) {
          header.setter("full")
        } else {
          header.setter(direction === "up" ? "semi" : "no")
        }
      }

      lastScrollY = scrollY > 0 ? scrollY : 0

      if (scrollTop + clientHeight >= scrollHeight - 150) {
        handler()
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [header, handler, page])

  return <>{children}</>
}

export default ScrollProvider
