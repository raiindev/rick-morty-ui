import React, { useState } from "react"
import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import { orange } from "@mui/material/colors"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Stack"
import ScrollProvider from "./components/ScrollProvider"
import { CustomStyles, scrollToTop } from "./utils"
import CharacterList from "./components/CharacterList"
import Header from "./components/Header"

const styles: CustomStyles = {
  Divider: {
    alignItems: "center",
    color: "white",
    marginBottom: "64px",

    ">p": {
      fontSize: "2.5rem",
      fontWeight: 700,
      marginRight: "16px",
    },

    hr: {
      flexGrow: 1,
      border: "2px solid #bfe246",
    },
  },
  GoTopButton: {
    backgroundColor: orange[900],
    bottom: "24px",
    color: "white",
    position: "fixed",
    right: "24px",
  },
}

const App: React.FC<{}> = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState("full")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <Container
        component='main'
        id='main-container'
        maxWidth='xl'
        sx={{ backgroundColor: "transparent", marginTop: "310px" }}
      >
        <ScrollProvider
          handler={() => setCurrentPage(currentPage + 1)}
          page={currentPage}
          header={{ visibility: isHeaderVisible, setter: setIsHeaderVisible }}
        >
          <Box direction='row' sx={styles.Divider}>
            <Typography> List of characters</Typography>
            <hr />
          </Box>
          <CharacterList page={currentPage} />
          <Fab aria-label='go to top' title='Go to top' onClick={() => scrollToTop()} sx={styles.GoTopButton}>
            <ArrowUpward />
          </Fab>
        </ScrollProvider>
      </Container>
    </>
  )
}

export default App
