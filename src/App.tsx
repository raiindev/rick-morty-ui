import React, { useCallback, useEffect, useMemo, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Container, Fab, Grid } from "@mui/material"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import { Character, Info } from "./types/rickAndMortyApiInterfaces"
import CharacterCard from "./components/CharacterCard"
import InfiteScroll from "./components/InfiteScroll"
import CharacterDialog from "./components/CharacterDialog"
import { blueGrey } from "@mui/material/colors"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

const getCharacters: (page: number) => Promise<AxiosResponse<Info<Character[]>>> = async (page) => {
  return await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)
}

const scrollToTop: () => void = () => {
  window.scrollTo(0, 0)
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
    <InfiteScroll handler={() => setCurrentPage(currentPage + 1)} page={currentPage}>
      <Container maxWidth='xl' sx={{ backgroundColor: blueGrey["900"] }}>
        <Grid container spacing={2}>
          {memoizedCards}
        </Grid>
      </Container>
      <Fab
        color='primary'
        aria-label='go to top'
        title='Go to top'
        onClick={() => scrollToTop()}
        sx={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
        }}
      >
        <ArrowUpward />
      </Fab>
      <CharacterDialog
        open={dialogStatus.isOpen}
        selectedValue={dialogStatus.selectedValue}
        onClose={handleDialogClose}
      />
    </InfiteScroll>
  )
}

export default App
