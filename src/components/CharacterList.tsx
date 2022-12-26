import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CharacterCard from "./CharacterCard"
import CharacterDialog from "./CharacterDialog"
import { Character } from "../types/rickAndMortyApiInterfaces"
import CharacterCardSkeleton from "./CharacterCardSkeleton"
import { getCharacters } from "../utils"
import { AxiosError } from "axios"
import InfiniteScrollProvider from "./InfiniteScrollProvider"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

const CharacterList: FC<{
  searchFilters: { currentPage: number; searchString: string }
  onScrollCallBackFn: () => void
}> = memo(({ searchFilters, onScrollCallBackFn }) => {
  const { currentPage, searchString } = searchFilters
  const [charactersData, setCharactersData] = useState<{
    characters: Character[] | never[]
    totalPages: number
  }>({
    characters: Array.from(new Array(12)),
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [dialogStatus, setDialogStatus] = useState<DialogStatus>({
    selectedValue: undefined,
    isOpen: false,
  })

  useEffect(() => {
    setIsLoading(true)
    getCharacters(currentPage, searchString)
      .then(({ data }) => {
        const results = data.results || []
        const totalPages = data.info?.pages || 0

        setCharactersData((prevState) => ({
          characters: currentPage !== 1 ? [...prevState.characters, ...results] : results,
          totalPages: totalPages,
        }))
        setIsLoading(false)
      })
      .catch((error: AxiosError<{ error: string }>) => {
        setIsLoading(false)
        if (currentPage === 1 && searchString !== "" && error.response?.data?.error === "There is nothing here") {
          setCharactersData({ characters: [], totalPages: 0 })
        }
      })

    // Not using finally due to known issue [https://github.com/testing-library/react-testing-library/issues/1051]
  }, [currentPage, searchString])

  const handleCharacterCardClick = useCallback((charInfos: Character) => {
    setDialogStatus({ selectedValue: charInfos, isOpen: true })
  }, [])

  const handleDialogClose: () => void = useCallback(() => {
    setDialogStatus({
      selectedValue: undefined,
      isOpen: false,
    })
  }, [])

  const noResultsComponent = (
    <Grid item xs={12} sx={{ textAlign: "center" }}>
      <Typography sx={{ color: "white", fontSize: "3rem" }}>No results</Typography>
    </Grid>
  )

  const memoizedCards = useMemo(() => {
    const charactersArray = isLoading
      ? [...charactersData.characters, ...Array.from(new Array(12))]
      : charactersData.characters
    return charactersArray.map((charInfos, index) =>
      charInfos ? (
        <CharacterCard
          {...charInfos}
          key={charInfos.id + charInfos.name}
          openCharacterDialog={handleCharacterCardClick}
        />
      ) : (
        <CharacterCardSkeleton key={index} />
      )
    )
  }, [charactersData.characters, handleCharacterCardClick, isLoading])

  const hasMore = currentPage < charactersData.totalPages

  return (
    <InfiniteScrollProvider callback={onScrollCallBackFn} hasMore={hasMore}>
      <Grid
        className='characters-list'
        container
        component='ul'
        spacing={2}
        sx={{ listStyle: "none", padding: 0 }}
        aria-label='characters list'
      >
        {searchString !== "" && !charactersData.characters.length ? noResultsComponent : memoizedCards}
      </Grid>
      <CharacterDialog
        open={dialogStatus.isOpen}
        selectedValue={dialogStatus.selectedValue}
        onClose={handleDialogClose}
      />
    </InfiniteScrollProvider>
  )
})

export default CharacterList
