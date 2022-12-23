import React, { FC, memo, useCallback, useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import CharacterCard from "./CharacterCard"
import CharacterDialog from "./CharacterDialog"
import { Character } from "../types/rickAndMortyApiInterfaces"
import CharacterCardSkeleton from "./CharacterCardSkeleton"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

const CharacterList: FC<{ characters: Character[]; loading: boolean }> = memo(({ characters, loading }) => {
  const [dialogStatus, setDialogStatus] = useState<DialogStatus>({
    selectedValue: undefined,
    isOpen: false,
  })

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
    return (loading ? Array.from(new Array(12)) : characters).map((charInfos, index) =>
      charInfos ? (
        <CharacterCard {...charInfos} key={charInfos.id} openCharacterDialog={handleCharacterCardClick} />
      ) : (
        <CharacterCardSkeleton key={index} />
      )
    )
  }, [loading, handleCharacterCardClick, characters])

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
