import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Character, Info } from "../types/rickAndMortyApiInterfaces"

const getCharacters = async (page: number): Promise<AxiosResponse<Info<Character[]>>> => {
  return await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)
}

const useCharacters: (page: number) => {
  characters: Character[] | never[]
  isLoading: boolean
} = (page) => {
  const [characters, setCharacters] = useState<Character[] | never[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCharacters(page)
      .then(({ data }) => {
        const results = data.results || []
        setCharacters((prevState) => (page !== 1 ? [...prevState, ...results] : results))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [page])

  return { characters, isLoading }
}

export default useCharacters
