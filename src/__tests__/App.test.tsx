import { getCharacterEpisodes, getCharacters } from "../utils"
import { cleanup, waitFor, render, screen, fireEvent } from "@testing-library/react"
import App from "../App"
import { Character, Episode } from "../types/rickAndMortyApiInterfaces"

jest.mock("../utils", () => {
  return {
    getCharacters: jest.fn().mockImplementation(() => []),
    getStatusColor: jest.fn().mockImplementation(() => ""),
    getStatusLabel: jest.fn().mockImplementation(() => ""),
    getEpisodesNumber: jest.fn().mockImplementation(() => []),
    getCharacterEpisodes: jest.fn().mockImplementation(() => []),
  }
})

describe("CharacterList", () => {
  const mockedCharacters: Character[] = [
    {
      id: 0,
      url: "",
      created: "",
      name: "Mario Rossi",
      status: "Dead",
      species: "Human",
      type: "",
      gender: "unknown",
      origin: {
        name: "Earth",
        url: "string",
      },
      location: {
        name: "Earth",
        url: "string",
      },
      image: "image url",
      episode: [],
    },
    {
      id: 1,
      url: "",
      created: "",
      name: "Giovanni Rana",
      status: "Alive",
      species: "Alien",
      type: "",
      gender: "unknown",
      origin: {
        name: "Mars",
        url: "string",
      },
      location: {
        name: "Mars",
        url: "string",
      },
      image: "image url",
      episode: [],
    },
  ]
  const mockedCharacterEpisodes: Partial<Episode>[] = [
    {
      id: 0,
      episode: "S1E01",
      name: "Pilot",
    },
    {
      id: 1,
      episode: "S1E02",
      name: "The Mock",
    },
  ]

  afterEach(cleanup)

  it("shows no characters initially", async () => {
    getCharacters.mockResolvedValueOnce({ data: { results: mockedCharacters } })

    render(<App />)

    const charactersList = await screen.findByRole("list")
    expect(charactersList).toBeInTheDocument()

    const charactersCards = screen.queryAllByRole("listitem")
    expect(charactersCards).toHaveLength(0)
  })

  it("shows characters after fetching them", async () => {
    getCharacters.mockResolvedValueOnce({ data: { results: mockedCharacters } })

    render(<App />)

    await waitFor(() => {
      const charactersCards = screen.queryAllByRole("listitem")
      expect(charactersCards).toHaveLength(2)
    })

    await waitFor(() => {
      const firstCharacterCard = screen.getByText(mockedCharacters[0].name)
      expect(firstCharacterCard).toBeInTheDocument()
    })
  })

  it("shows the specific character dialog after character card click", async () => {
    getCharacters.mockResolvedValueOnce({ data: { results: mockedCharacters } })
    getCharacterEpisodes.mockResolvedValueOnce({ data: mockedCharacterEpisodes })

    render(<App />)

    await waitFor(async () => {
      const characterCard = screen.getByText("Mario Rossi")
      await fireEvent.click(characterCard)

      await waitFor(() => {
        const characterDialog = screen.getByRole("dialog")
        expect(characterDialog).toBeInTheDocument()
      })

      await waitFor(() => {
        const firstEpisode = mockedCharacterEpisodes[0]
        const characterDialog = screen.getByText(`${firstEpisode.episode} - ${firstEpisode.name}`)
        expect(characterDialog).toBeInTheDocument()
      })
    })
  })
})
