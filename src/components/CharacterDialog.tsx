import { FC, memo, useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { blueGrey } from "@mui/material/colors"
import { Character, Episode } from "../types/rickAndMortyApiInterfaces"
import CharacterStatusChip from "./CharacterStatusChip"
import { getCharacterEpisodes, getEpisodesNumber, CustomStyles } from "../utils"

const styles: CustomStyles = {
  CharacterDialog: {
    alignItems: "center",
    backgroundColor: `${blueGrey["700"]} !important`,
    color: "white",
    display: "flex",
    flexDirection: "column",

    img: {
      borderRadius: "50%",
      width: "150px",
    },
  },
  CharacterDialogTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    paddingBottom: 0,
  },
  CharacterDialogChipsContainer: {},
  CharacterDialogChip: {
    color: "white",
    borderWidth: "2px",
    margin: "0 6px 12px 0",
  },
  CharacterDialogEpisodes: {
    textAlign: "center",
    "> p": {
      fontSize: "1.2rem",
      fontWeight: 700,
      marginBottom: "8px",
    },
    div: {
      maxHeight: "200px",
      overflow: "auto",
    },
    "div p": {
      fontSize: ".95rem",
    },
  },
}

export interface CharacterDialogProps {
  open: boolean
  selectedValue: Character | undefined
  onClose: () => void
}

const CharacterDialog: FC<CharacterDialogProps> = memo(({ open, selectedValue, onClose }) => {
  const [episodes, setEpisodes] = useState<Pick<Episode, "id" | "episode" | "name">[] | never[]>([])

  useEffect(() => {
    if (selectedValue?.episode) {
      const episodesNumber = getEpisodesNumber(selectedValue?.episode)
      getCharacterEpisodes(episodesNumber)
        .then(({ data }) => {
          if (Array.isArray(data)) {
            setEpisodes(data.map(({ episode, id, name }) => ({ episode, id, name })))
          } else {
            setEpisodes([{ episode: data.episode, id: data.id, name: data.name }])
          }
        })
        .catch(console.error)
    }
  }, [selectedValue])

  if (selectedValue) {
    const { gender, image, location, name, species, status } = selectedValue
    const {
      CharacterDialog,
      CharacterDialogTitle,
      CharacterDialogChips,
      CharacterDialogChip,
      CharacterDialogEpisodes,
    } = styles

    const handleClose = () => {
      onClose()
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogContent sx={CharacterDialog}>
          <CharacterStatusChip status={status} overrideStyles={{ alignSelf: "flex-start", marginBottom: "12px" }} />
          <img src={image} alt={`${name}`} loading='lazy' />
          <DialogTitle sx={CharacterDialogTitle}>{selectedValue.name}</DialogTitle>
          <Typography sx={{ paddingBottom: "16px" }}>
            Last seen in: <b>{location.name}</b>
          </Typography>
          <Box sx={CharacterDialogChips}>
            <Chip sx={CharacterDialogChip} label={species} variant='outlined' />
            <Chip sx={CharacterDialogChip} label={gender} variant='outlined' />
          </Box>
          <Box sx={CharacterDialogEpisodes}>
            <Typography>Episodes:</Typography>
            <Box>
              {episodes.map(({ episode, id, name }) => (
                <Typography key={id}>
                  {episode} - {name}
                </Typography>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    )
  }

  return null
})

export default CharacterDialog
