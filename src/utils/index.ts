import { green, red, grey } from "@mui/material/colors"
import axios, { AxiosResponse } from "axios"
import { Character, Episode, Info } from "../types/rickAndMortyApiInterfaces"

export const getEpisodesNumber = (episodes: string[]): number[] =>
  episodes.map((episode) => parseInt(episode.substring(episode.lastIndexOf("/") + 1)))

export const getEpisodeNumber = (episode: string): number => parseInt(episode.substring(episode.lastIndexOf("/") + 1))

export const getStatusColor: (status: string) => string = (status) => {
  switch (status) {
    case "Alive":
      return green["700"]
    case "Dead":
      return red["400"]
    default:
      return grey["500"]
  }
}

export const getStatusLabel = (status: string) => (status === "Dead" ? "Deceased" : status)

export const getCharacters: (page: number) => Promise<AxiosResponse<Info<Character[]>>> = async (page) =>
  await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)

export const getCharacterEpisodes: (
  characterEpisodes: number[]
) => Promise<AxiosResponse<Episode[] | Episode>> = async (characterEpisodes) =>
  await axios.get<Episode[] | Episode>(`https://rickandmortyapi.com/api/episode/${characterEpisodes.toString()}`)

export const scrollToTop: () => void = () => {
  window.scrollTo(0, 0)
}
