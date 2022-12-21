import React, { useState, useEffect, useRef } from "react"
import axios, { AxiosResponse } from "axios"
import { Container, Fab, Grid } from "@mui/material"
import ArrowUpward from "@mui/icons-material/ArrowUpward"
import { Character, Info } from "./types/rickAndMortyApiInterfaces"
import CharacterCard from "./components/CharacterCard"
import InfiteScroll from "./components/InfiteScroll"
import "./styles/base.scss"

const getCharacters: (page: number) => Promise<AxiosResponse<Info<Character[]>>> = async (page) => {
  return await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)
}

const scrollToTop: () => void = () => {
  window.scrollTo(0, 0)
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
    <InfiteScroll handler={() => setCurrentPage(currentPage + 1)} page={currentPage}>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          {characters.map((charInfos) => {
            return <CharacterCard {...charInfos} key={charInfos.id} />
          })}
        </Grid>
      </Container>
      <Fab
        className='go-top-button'
        color='primary'
        aria-label='go to top'
        title='Go to top'
        onClick={() => scrollToTop()}
      >
        <ArrowUpward />
      </Fab>
    </InfiteScroll>
  )
}

export default App
