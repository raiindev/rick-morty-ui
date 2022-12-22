import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import { blueGrey, orange } from "@mui/material/colors"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import { Character } from "./types/rickAndMortyApiInterfaces"
import InfiteScroll from "./components/InfiteScroll"
import logo from "./images/logo.png"
import { CustomStyles, getCharacters, scrollToTop } from "./utils"
import CharacterList from "./components/CharacterList"

const styles: CustomStyles = {
  Header: {
    backgroundColor: blueGrey["900"],
    display: "flex",
    height: "75px",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,

    img: { height: "75px" },
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
  const [characters, setCharacters] = useState<Character[] | never[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getCharacters(currentPage)
      .then(({ data }) => {
        const results = data.results || []
        setCharacters((prevState) => (currentPage !== 1 ? [...prevState, ...results] : results))
      })
      .catch(console.error)
  }, [currentPage])

  return (
    <>
      <Box sx={styles.Header}>
        <img src={logo} alt='Rick and Morty logo' />
      </Box>
      <Container maxWidth='xl' sx={{ backgroundColor: blueGrey["900"], paddingTop: "80px" }}>
        <InfiteScroll handler={() => setCurrentPage(currentPage + 1)} page={currentPage}>
          <CharacterList characters={characters} />
          <Fab aria-label='go to top' title='Go to top' onClick={() => scrollToTop()} sx={styles.GoTopButton}>
            <ArrowUpward />
          </Fab>
        </InfiteScroll>
      </Container>
    </>
  )
}

export default App
