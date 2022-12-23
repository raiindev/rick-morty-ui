import React, { FC, CSSProperties, Dispatch, SetStateAction, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material"
import Search from "@mui/icons-material/Search"
import { useDebounce } from "../utils"

const getHeaderStyle: (isVisible: string) => CSSProperties = (isVisible) => ({
  backgroundColor: "rgba(0, 0, 0, .9)",
  height: "300px",
  position: "fixed",
  top: isVisible === "full" ? 0 : isVisible === "no" ? "-300px" : "-200px",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "500ms",
  width: "100%",
  zIndex: 30,
})

const searchContainerStyle: SxProps = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
}

const searchBoxStyle: SxProps = {
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "10px",
  color: "white",
  display: "flex",
  marginBottom: "24px",
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
}

const Header: FC<{ isVisible: string; onSearch: Dispatch<SetStateAction<string>> }> = ({ isVisible, onSearch }) => {
  const [value, setValue] = useState("")

  useDebounce(() => onSearch(value), [value], 500)

  return (
    <header style={getHeaderStyle(isVisible)}>
      <Container maxWidth='xl' sx={searchContainerStyle}>
        <img src={process.env.PUBLIC_URL + "/img/logo.webp"} height='200' alt='Rick and Morty logo' />
        <Box sx={searchBoxStyle}>
          <input placeholder='Find a character' aria-label='ok' onChange={(e) => setValue(e.target.value)} />
          <Search />
        </Box>
      </Container>
    </header>
  )
}

export default Header
