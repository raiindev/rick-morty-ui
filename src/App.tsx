import React, { useEffect, useState } from "react"

import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import { orange } from "@mui/material/colors"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import { Character } from "./types/rickAndMortyApiInterfaces"
import InfiteScroll from "./components/InfiteScroll"
import { CustomStyles, getCharacters, scrollToTop } from "./utils"
import CharacterList from "./components/CharacterList"
import Header from "./components/Header"

const styles: CustomStyles = {
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
  const [isLoading, setIsLoading] = useState(true)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    getCharacters(currentPage)
      .then(({ data }) => {
        const results = data.results || []
        setCharacters((prevState) => (currentPage !== 1 ? [...prevState, ...results] : results))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [currentPage])

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <Container
        component='main'
        id='main-container'
        maxWidth='xl'
        sx={{ backgroundColor: "transparent", paddingTop: "80px" }}
      >
        <InfiteScroll
          handler={() => setCurrentPage(currentPage + 1)}
          page={currentPage}
          headerHandler={setIsHeaderVisible}
        >
          <CharacterList characters={characters} loading={isLoading} />
          <Fab aria-label='go to top' title='Go to top' onClick={() => scrollToTop()} sx={styles.GoTopButton}>
            <ArrowUpward />
          </Fab>
        </InfiteScroll>
      </Container>
    </>
  )
}

export default App
