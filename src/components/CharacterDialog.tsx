import { FC, memo, useEffect, useState, MouseEventHandler, useRef } from "react"
import { Theme, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { Character, Episode, Location } from "../types/rickAndMortyApiInterfaces"
import { getCharacterEpisodes, getEpisodesNumber, getLocationInfo, CustomStyles, getStatusColor } from "../utils"

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
  CharacterDialogLocationInfos: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
    textAlign: "center",

    "& p": {
      fontSize: ".75rem",
    },

    ">p:first-of-type:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },

    ".location-infos": {
      display: "none",
      marginTop: "8px",
    },

    "&.show": {
      ".location-infos": {
        display: "block",
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
  const locationRef = useRef(null)
  const [episodes, setEpisodes] = useState<Pick<Episode, "id" | "episode" | "name">[] | never[]>([])
  const [locationInfo, setLocationInfo] = useState<Location | undefined>(undefined)

  useEffect(() => {
    if (selectedValue?.episode && selectedValue?.location) {
      const episodesNumber = getEpisodesNumber(selectedValue?.episode)
      Promise.all([getCharacterEpisodes(episodesNumber), getLocationInfo(selectedValue.location.url)])
        .then(([resEpisodes, resLocationInfo]) => {
          if (Array.isArray(resEpisodes.data)) {
            setEpisodes(resEpisodes.data.map(({ episode, id, name }) => ({ episode, id, name })))
          } else {
            setEpisodes([{ episode: resEpisodes.data.episode, id: resEpisodes.data.id, name: resEpisodes.data.name }])
          }
          setLocationInfo(resLocationInfo.data)
        })
        .catch(console.error)
    }
  }, [selectedValue])

  const onShowMoreInfosClick: MouseEventHandler<HTMLSpanElement> = () => {
    if (locationRef?.current) {
      const locationDiv = locationRef.current as HTMLDivElement
      locationDiv.classList.toggle("show")
    }
  }

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
      CharacterDialogLocationInfos,
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
          <Box sx={CharacterDialogLocationInfos} ref={locationRef}>
            <Typography onClick={(e) => onShowMoreInfosClick(e)}>(Show location infos)</Typography>
            {locationInfo && (
              <Box className='location-infos'>
                <Typography>
                  Type: <b>{locationInfo.type}</b>
                </Typography>
                <Typography>
                  Dimension: <b>{locationInfo.dimension}</b>
                </Typography>
                <Typography>
                  Nº of residents: <b>{locationInfo.residents.length}</b>
                </Typography>
              </Box>
            )}
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
            <ul className='episodes-list' style={{ listStyle: "none", padding: 0 }}>
              {episodes.map(({ episode, id, name }) => (
                <li key={id}>
                  <Typography>
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
