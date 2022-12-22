import React, { useCallback, useEffect, useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import Grid from "@mui/material/Grid"
import blueGrey from "@mui/material/colors/blueGrey"
import orange from "@mui/material/colors/orange"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import { Character } from "./types/rickAndMortyApiInterfaces"
import CharacterCard from "./components/CharacterCard"
import InfiteScroll from "./components/InfiteScroll"
import CharacterDialog from "./components/CharacterDialog"
import logo from "./images/logo.png"
import { CustomStyles, getCharacters, scrollToTop } from "./utils"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

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
  const [dialogStatus, setDialogStatus] = useState<DialogStatus>({
    selectedValue: undefined,
    isOpen: false,
  })

  const handleCharacterCardClick = useCallback((charInfos: Character) => {
    setDialogStatus({ selectedValue: charInfos, isOpen: true })
  }, [])

  const handleDialogClose: () => void = useCallback(() => {
    setDialogStatus({
      selectedValue: undefined,
      isOpen: false,
    })
  }, [])

  useEffect(() => {
    getCharacters(currentPage)
      .then(({ data }) => {
        const results = data.results || []
        setCharacters((prevState) => (currentPage !== 1 ? [...prevState, ...results] : results))
      })
      .catch(console.error)
  }, [currentPage])

  const memoizedCards = useMemo(() => {
    return characters.map((charInfos) => (
      <CharacterCard {...charInfos} key={charInfos.id} openCharacterDialog={handleCharacterCardClick} />
    ))
  }, [handleCharacterCardClick, characters])

  return (
    <>
      <Box sx={styles.Header}>
        <img src={logo} alt='Rick and Morty logo' />
      </Box>
      <Container maxWidth='xl' sx={{ backgroundColor: blueGrey["900"], paddingTop: "80px" }}>
        <InfiteScroll handler={() => setCurrentPage(currentPage + 1)} page={currentPage}>
          <Grid container spacing={2}>
            {memoizedCards}
          </Grid>
          <Fab aria-label='go to top' title='Go to top' onClick={() => scrollToTop()} sx={styles.GoTopButton}>
            <ArrowUpward />
          </Fab>
          <CharacterDialog
            open={dialogStatus.isOpen}
            selectedValue={dialogStatus.selectedValue}
            onClose={handleDialogClose}
          />
        </InfiteScroll>
      </Container>
    </>
  )
}

export default App
