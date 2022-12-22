import { FC, memo } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { Character } from "../types/rickAndMortyApiInterfaces"

export interface CharacterDialogProps {
  open: boolean
  selectedValue: Character | undefined
  onClose: () => void
}

const CharacterDialog: FC<CharacterDialogProps> = memo(({ open, selectedValue, onClose }) => {
  const handleClose = () => {
    onClose()
  }

  return selectedValue ? (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{selectedValue.name}</DialogTitle>
    </Dialog>
  ) : null
})

export default CharacterDialog
