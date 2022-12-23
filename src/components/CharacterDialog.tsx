import { FC, memo, useEffect, useState } from "react"
import { Theme, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { Character, Episode } from "../types/rickAndMortyApiInterfaces"
import { getCharacterEpisodes, getEpisodesNumber, CustomStyles, getStatusColor } from "../utils"
import CharacterStatus from "./CharacterStatus"

const getStyles: (theme: Theme) => CustomStyles = (theme) => ({
  CharacterDialog: {
    alignItems: "center",
    backgroundColor: "#131313 !important",
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
    padding: "16px 0 0 0",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  CharacterDialogChipsContainer: {},
  CharacterDialogChip: {
    color: "white",
    borderWidth: "2px",
    margin: "0 6px 12px 0",
  },
  CharacterDialogLocation: {
    alignItems: "baseline",
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",

    "p:first-child": {
      marginRight: "5px",
    },

    "p:last-child": {
      fontSize: "1.25rem",
      fontWeight: 700,
    },

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
      "p:first-child": {
        margin: 0,
      },
    },
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
})

export interface CharacterDialogProps {
  open: boolean
  selectedValue: Character | undefined
  onClose: () => void
}

const CharacterDialog: FC<CharacterDialogProps> = memo(({ open, selectedValue, onClose }) => {
  const theme = useTheme()
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
      CharacterDialogLocation,
      CharacterDialogEpisodes,
    } = getStyles(theme)

    const handleClose = () => {
      onClose()
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogContent sx={CharacterDialog}>
          <CharacterStatus
            status={status}
            labelStyle={{ fontSize: "1rem" }}
            containerStyle={{
              alignSelf: "flex-start",
              borderRadius: "20px",
              border: `1px solid ${getStatusColor(status)}`,
              marginBottom: "8px",
              padding: "4px 12px",
            }}
          />
          <img src={image} alt={`${name}`} loading='lazy' />
          <DialogTitle sx={CharacterDialogTitle}>{selectedValue.name}</DialogTitle>
          <Box sx={CharacterDialogLocation}>
            <Typography>Last seen in:</Typography>
            <Typography>{location.name}</Typography>
          </Box>
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
