/// <reference types="cypress"/>

import charactersFirstBatch from "../first_batch.json"
import charactersFirstBatchFiltered from "../first_batch_filtered.json"
import charactersSecondBatch from "../second_batch.json"

describe("Rick & Morty UI", () => {
  const mockedCharacterEpisodes = [
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

  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("shows no cards when there are no characters", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1",
      },
      { data: { results: [] } }
    ).as("getCharacters")

    cy.wait("@getCharacters").then(() => {
      cy.get("ul.MuiGrid-container").should("exist").children().should("have.length", 0)
    })
  })

  it("renders first batch of characters with correct info", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1",
      },
      { results: charactersFirstBatch }
    ).as("getCharacters")

    cy.wait("@getCharacters").then(() => {
      cy.get(".characters-list").should("exist").children(".character-card").should("have.length", 20)
      cy.get(".character-card h2").first().contains(charactersFirstBatch[0].name)
    })
  })

  it("loads second batch of characters on scroll", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1",
      },
      { info: { pages: 2 }, results: charactersFirstBatch }
    ).as("getCharactersFirstPage")
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=2",
      },
      { info: { pages: 2 }, results: charactersSecondBatch }
    ).as("getCharactersSecondPage")

    cy.wait("@getCharactersFirstPage").then(() => {
      cy.scrollTo("bottom")
    })

    cy.wait("@getCharactersSecondPage").then(() => {
      cy.get("ul.MuiGrid-container", { timeout: 10000 }).should("exist").children().should("have.length", 40)
    })
  })

  it("shows filtered results when a search is performed", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1",
      },
      { info: { pages: 1 }, results: charactersFirstBatch }
    ).as("getCharactersFirstPage")
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1&name=Antonino",
      },
      { info: { pages: 1 }, results: charactersFirstBatchFiltered }
    ).as("getFilteredCharacters")

    cy.wait("@getCharactersFirstPage").then(() => {
      cy.get("input[aria-label='Find a character']").type("Antonino")
    })

    cy.wait("@getFilteredCharacters").then(() => {
      cy.get("ul.MuiGrid-container", { timeout: 10000 }).should("exist").children().should("have.length", 2)
    })
  })

  it("show a dialog when a character card 'more details' button is clicked", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/character/?page=1",
      },
      { results: charactersFirstBatch }
    ).as("getCharacters")

    cy.intercept(
      {
        method: "GET",
        url: "https://rickandmortyapi.com/api/episode*",
      },
      mockedCharacterEpisodes
    ).as("getCharacterEpisodes")

    cy.wait("@getCharacters").then(() => {
      cy.get(".character-card:first-of-type button").should("exist").trigger("click")
    })

    cy.wait("@getCharacterEpisodes").then(() => {
      cy.get("div[role='dialog']").should("be.visible")
      cy.get(".episodes-list").should("be.visible").children().should("have.length", mockedCharacterEpisodes.length)
    })
  })
})
