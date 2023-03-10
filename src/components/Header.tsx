import React, { FC, useEffect, useState, memo } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Search from "@mui/icons-material/Search"
import { CustomStyles, useDebounce } from "../utils"
import { Theme, useTheme } from "@mui/material/styles"

const getStyles: (isVisible: string, theme: Theme) => CustomStyles = (isVisible, theme) => ({
  Header: {
    backgroundColor: "rgba(0, 0, 0, .9)",
    height: "185px",
    position: "fixed",
    top: isVisible === "full" ? 0 : isVisible === "no" ? "-250px" : "-105px",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "500ms",
    width: "100%",
    zIndex: 30,

    [theme.breakpoints.up("sm")]: {
      top: isVisible === "full" ? 0 : isVisible === "no" ? "-250px" : "-170px",
      height: "250px",
    },
  },

  HeaderContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",

    img: {
      marginTop: "8px",
      width: "300px",
      [theme.breakpoints.up("sm")]: {
        width: "500px",
      },
    },
  },

  SearchBox: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "10px",
    color: "white",
    display: "flex",
    margin: "12px 0",
    position: "relative",
    width: "100%",

    svg: {
      fontSize: "1.75rem",
      marginRight: "4px",
      position: "absolute",
      right: 4,
    },

    "& input": {
      backgroundColor: "transparent",
      border: 0,
      borderRadius: "10px",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "1.25rem",
      height: "100%",
      padding: "16px 12px",
      width: "100%",

      "::placeholder": {
        color: "white",
      },

      ":focus": {
        outlineWidth: "thin",
      },
    },
  },
})

const Header: FC<{ onSearch: (value: string) => void }> = memo(({ onSearch }) => {
  const theme = useTheme()
  const [isHeaderVisible, setIsHeaderVisible] = useState("full")
  const [value, setValue] = useState("")

  const { Header, HeaderContent, SearchBox } = getStyles(isHeaderVisible, theme)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const onScroll = () => {
      const scrollY = window.pageYOffset
      const scrollTop = document.documentElement.scrollTop
      const direction = scrollY > lastScrollY ? "down" : "up"

      if (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10) {
        if (scrollTop <= 300) {
          setIsHeaderVisible("full")
        } else {
          setIsHeaderVisible(direction === "up" ? "semi" : "no")
        }
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useDebounce(() => onSearch(value), [value], 500)

  return (
    <Box component='header' sx={Header}>
      <Container maxWidth='xl' sx={HeaderContent}>
        <img src={process.env.PUBLIC_URL + "/img/logo.webp"} alt='Rick and Morty logo' />
        <Box sx={SearchBox}>
          <input
            placeholder='Find a character'
            aria-placeholder='Find a character'
            onChange={(e) => setValue(e.target.value)}
          />
          <Search />
        </Box>
      </Container>
    </Box>
  )
})

export default Header
