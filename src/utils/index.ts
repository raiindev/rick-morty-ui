import { green, red, grey } from "@mui/material/colors"
import axios, { AxiosResponse } from "axios"
import { SxProps } from "@mui/system"
import { Character, Episode, Info } from "../types/rickAndMortyApiInterfaces"

type AxiosFetchCall<T, V> = (arg: V) => Promise<AxiosResponse<T>>

export interface CustomStyles {
  [key: string]: SxProps
}

export const getEpisodesNumber: (episodes: string[]) => number[] = (episodes) =>
  episodes.map((episode) => parseInt(episode.substring(episode.lastIndexOf("/") + 1)))

export const getEpisodeNumber: (episode: string) => number = (episode) =>
  parseInt(episode.substring(episode.lastIndexOf("/") + 1))

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

export const getStatusLabel: (status: string) => string = (status) => (status === "Dead" ? "Deceased" : status)

export const getCharacters: AxiosFetchCall<Info<Character[]>, number> = async (page) =>
  await axios.get<Info<Character[]>>(`https://rickandmortyapi.com/api/character/?page=${page}`)

export const getCharacterEpisodes: AxiosFetchCall<Episode[] | Episode, number[]> = async (characterEpisodes) =>
  await axios.get<Episode[] | Episode>(`https://rickandmortyapi.com/api/episode/${characterEpisodes.toString()}`)

export const scrollToTop: () => void = () => {
  window.scrollTo(0, 0)
}
