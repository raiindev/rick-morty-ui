import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import CharacterCard from "./CharacterCard"
import CharacterDialog from "./CharacterDialog"
import { Character } from "../types/rickAndMortyApiInterfaces"
import CharacterCardSkeleton from "./CharacterCardSkeleton"
import { getCharacters } from "../utils"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

const CharacterList: FC<{ page: number }> = memo(({ page }) => {
  const [characters, setCharacters] = useState<Character[] | never[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogStatus, setDialogStatus] = useState<DialogStatus>({
    selectedValue: undefined,
    isOpen: false,
  })

  useEffect(() => {
    getCharacters(page)
      .then(({ data }) => {
        const results = data.results || []
        setCharacters((prevState) => (page !== 1 ? [...prevState, ...results] : results))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [page])

  const handleCharacterCardClick = useCallback((charInfos: Character) => {
    setDialogStatus({ selectedValue: charInfos, isOpen: true })
  }, [])

  const handleDialogClose: () => void = useCallback(() => {
    setDialogStatus({
      selectedValue: undefined,
      isOpen: false,
    })
  }, [])

  const memoizedCards = useMemo(() => {
    return (isLoading ? Array.from(new Array(12)) : characters).map((charInfos, index) =>
      charInfos ? (
        <CharacterCard {...charInfos} key={charInfos.id} openCharacterDialog={handleCharacterCardClick} />
      ) : (
        <CharacterCardSkeleton key={index} />
      )
    )
  }, [isLoading, handleCharacterCardClick, characters])

  return (
    <>
      <Grid container spacing={2} role='list'>
        {memoizedCards}
      </Grid>
      <CharacterDialog
        open={dialogStatus.isOpen}
        selectedValue={dialogStatus.selectedValue}
        onClose={handleDialogClose}
      />
    </>
  )
})

export default CharacterList
