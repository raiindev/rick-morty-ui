import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import CharacterList from "../components/CharacterList"
import { Character } from "../types/rickAndMortyApiInterfaces"

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

  afterEach(cleanup)

  it("shows no characters if characters array is empty", () => {
    render(<CharacterList characters={[]} />)
    const characters = screen.getByRole("list")
    expect(within(characters).queryByRole("listitem")).not.toBeInTheDocument()
  })

  it("shows characters when array has elements", async () => {
    render(<CharacterList characters={mockedCharacters} />)
    const characters = screen.getByRole("list")
    expect(within(characters).getAllByRole("listitem")).toHaveLength(mockedCharacters.length)
  })
})
