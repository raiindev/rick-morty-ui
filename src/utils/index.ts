import { useEffect } from "react"
import { green, red, grey } from "@mui/material/colors"
import axios, { AxiosResponse } from "axios"
import { SxProps } from "@mui/system"
import { Character, Episode, Info } from "../types/rickAndMortyApiInterfaces"

type AxiosFetchCall<T> = Promise<AxiosResponse<T>>

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

export const getCharacters: (page: number, searchFilter: string) => AxiosFetchCall<Info<Character[]>> = async (
  page,
  searchFilter
) =>
  await axios.get<Info<Character[]>>(
    `https://rickandmortyapi.com/api/character/?page=${page}${searchFilter.length ? `&name=${searchFilter}` : ""}`
  )

export const getCharacterEpisodes: (characterEpisodes: number[]) => AxiosFetchCall<Episode[] | Episode> = async (
  characterEpisodes
) => await axios.get<Episode[] | Episode>(`https://rickandmortyapi.com/api/episode/${characterEpisodes.toString()}`)

export const scrollToTop: () => void = () => {
  window.scrollTo(0, 0)
}
export const useDebounce: (effect: () => void, deps: any, delay: number) => void = (effect, deps, delay) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay)

    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay])
}

export const throttle = (fn: () => void, delay: number) => {
  let wait = false
  return function () {
    if (!wait) {
      fn()
      wait = true
      setTimeout(function () {
        wait = false
      }, delay)
    }
  }
}
