import React, { FC, memo, useCallback, useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import CharacterCard from "./CharacterCard"
import CharacterDialog from "./CharacterDialog"
import { Character } from "../types/rickAndMortyApiInterfaces"

interface DialogStatus {
  selectedValue: Character | undefined
  isOpen: boolean
}

const CharacterList: FC<{ characters: Character[] }> = memo(({ characters }) => {
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
    return characters.map((charInfos) => (
      <CharacterCard {...charInfos} key={charInfos.id} openCharacterDialog={handleCharacterCardClick} />
    ))
  }, [handleCharacterCardClick, characters])

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
