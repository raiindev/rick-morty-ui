import React, { useCallback, useState } from "react"
import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import { orange } from "@mui/material/colors"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Stack"
import { CustomStyles, scrollToTop } from "./utils"
import CharacterList from "./components/CharacterList"
import Header from "./components/Header"
import { Theme, useTheme } from "@mui/material"

const getStyles: (theme: Theme) => CustomStyles = (theme) => ({
  MainContainer: {
    backgroundColor: "transparent",
    marginBottom: "50px",
    marginTop: "195px",

    [theme.breakpoints.up("sm")]: {
      marginTop: "300px",
    },
  },
  Divider: {
    alignItems: "center",
    color: "white",
    flexDirection: "column",
    marginBottom: "32px",

    ">p": {
      fontSize: "2rem",
      fontWeight: 700,
    },

    hr: {
      flexGrow: 1,
      border: "2px solid #bfe246",
    },

    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginBottom: "64px",

      ">p": {
        fontSize: "2.5rem !important",
        marginRight: "16px",
      },
    },

    [theme.breakpoints.down("sm")]: {
      hr: {
        width: "100%",
      },
    },
  },
  GoTopButton: {
    backgroundColor: orange[900],
    bottom: "24px",
    color: "white",
    position: "fixed",
    right: "24px",
  },
})

const App: React.FC<{}> = () => {
  const theme = useTheme()
  const [searchFilters, setSearchFilters] = useState({
    currentPage: 1,
    searchString: "",
  })

  const { Divider, GoTopButton, MainContainer } = getStyles(theme)

  const handleOnSearch = useCallback(
    (value: string) => {
      if (value !== searchFilters.searchString) {
        scrollToTop()
        setSearchFilters({
          searchString: value,
          currentPage: 1,
        })
      }
    },
    [searchFilters.searchString]
  )

  const handleOnScroll = useCallback(() => {
    setSearchFilters((prevState) => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
  }, [])

  return (
    <>
      <Header onSearch={handleOnSearch} />
      <Container component='main' id='main-container' maxWidth='xl' sx={MainContainer}>
        <Box direction='row' sx={Divider}>
          <Typography> List of characters</Typography>
          <hr />
        </Box>
        <CharacterList searchFilters={searchFilters} onScrollCallBackFn={handleOnScroll} />
        <Fab aria-label='go to top' title='Go to top' onClick={() => scrollToTop()} sx={GoTopButton}>
          <ArrowUpward />
        </Fab>
      </Container>
    </>
  )
}

export default App
