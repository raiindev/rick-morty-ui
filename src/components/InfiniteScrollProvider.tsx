import { FC, ReactNode, useEffect } from "react"

const InfiniteScrollProvider: FC<{
  children: ReactNode
  callback: () => void
  hasMore: boolean
}> = ({ children, callback, hasMore }) => {
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 150) {
        callback()
      }
    }

    hasMore && window.addEventListener("scroll", onScroll)
    return () => (hasMore ? window.removeEventListener("scroll", onScroll) : undefined)
  }, [callback, hasMore])

  return <>{children}</>
}

export default InfiniteScrollProvider
