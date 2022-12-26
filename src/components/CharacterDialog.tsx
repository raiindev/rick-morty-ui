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

const getStyles: (theme: Theme) => CustomStyles = (theme) => ({
  CharacterDialogContainer: {
    "& div[role='dialog']": {
      borderRadius: "10px",
      overflowY: "visible",
    },
  },
  CharacterDialog: {
    alignItems: "center",
    backgroundColor: "#131313 !important",
    border: "1px solid white",
    borderRadius: "10px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflowY: "visible",
  },
  CharacterDialogImage: {
    position: "absolute",
    top: "-25px",

    ">img": {
      borderRadius: "50%",
      height: "150px",
    },
  },
  CharacterDialogTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1,
    marginTop: "110px",
    textAlign: "center",

    [theme.breakpoints.up("sm")]: {
      lineHeight: 1.5,
      marginTop: "100px",
    },
  },
  CharacterDialogChipsContainer: {
    display: "flex",
  },
  CharacterDialogChip: {
    borderWidth: "2px",
    color: "white",
    margin: "0 6px 12px 0",
  },
  CharacterDialogLocation: {
    alignItems: "baseline",
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
    textAlign: "center",

    "p:first-of-type": {
      marginRight: "5px",
    },

    "p:last-of-type": {
      fontSize: "1.25rem",
      fontWeight: 700,
    },

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
      "p:first-of-type": {
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
    ul: {
      listStyle: "none",
      maxHeight: "200px",
      overflow: "auto",
      padding: 0,
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
      CharacterDialogContainer,
      CharacterDialog,
      CharacterDialogImage,
      CharacterDialogTitle,
      CharacterDialogChipsContainer,
      CharacterDialogChip,
      CharacterDialogLocation,
      CharacterDialogEpisodes,
    } = getStyles(theme)

    const handleClose = () => {
      onClose()
    }

    return (
      <Dialog onClose={handleClose} open={open} sx={CharacterDialogContainer}>
        <DialogContent sx={CharacterDialog}>
          <Box sx={CharacterDialogImage}>
            <img src={image} alt={`${name}`} loading='lazy' />
          </Box>
          <DialogTitle sx={CharacterDialogTitle}>{selectedValue.name}</DialogTitle>
          <Box sx={CharacterDialogLocation}>
            <Typography>Last seen in:</Typography>
            <Typography>{location.name}</Typography>
          </Box>
          <Box sx={CharacterDialogChipsContainer}>
            <Chip
              sx={{ ...CharacterDialogChip, borderColor: getStatusColor(status) }}
              label={status}
              variant='outlined'
            />
            <Chip sx={CharacterDialogChip} label={species} variant='outlined' />
            <Chip sx={CharacterDialogChip} label={gender} variant='outlined' />
          </Box>
          <Box sx={CharacterDialogEpisodes}>
            <Typography>Episodes:</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {episodes.map(({ episode, id, name }) => (
                <li>
                  <Typography key={id}>
                    {episode} - {name}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </DialogContent>
      </Dialog>
    )
  }

  return null
})

export default CharacterDialog
