import React from "react"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import CharacterCard from "../components/CharacterCard"
import { Character } from "../types/rickAndMortyApiInterfaces"

describe("CharacterCard", () => {
  const mockCharacter: Character = {
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
  }

  const openDialogFn = jest.fn()

  afterEach(cleanup)

  it("should render info correctly", async () => {
    render(<CharacterCard {...mockCharacter} openCharacterDialog={openDialogFn} />)

    expect(screen.getByText("Mario Rossi")).toBeInTheDocument()
  })

  it("should trigger open dialog fn on click", async () => {
    render(<CharacterCard {...mockCharacter} openCharacterDialog={openDialogFn} />)

    await fireEvent.click(screen.getByText("Mario Rossi"))

    expect(openDialogFn.call.length).toBe(1)
  })
})
