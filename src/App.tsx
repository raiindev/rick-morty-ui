import React, { useState, useEffect, useRef } from "react"
import axios, { AxiosResponse } from "axios"
import { Button, Container, Grid } from "@mui/material"
import { Character, Info } from "./types/rickAndMortyApiInterfaces"
import CharacterCard from "./components/CharacterCard"
import InfiteScroll from "./components/InfiteScroll"

const getCharacters = async (page: number): Promise<AxiosResponse<Info<Character[]>>> => {
  return await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)
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
    </InfiteScroll>
  )
}

export default App
