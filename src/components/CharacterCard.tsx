import { FC, memo } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { grey } from "@mui/material/colors"
import { CustomStyles } from "../utils"
import CharacterStatus from "./CharacterStatus"
import { Button } from "@mui/material"

const styles: CustomStyles = {
  CardContainer: {
    border: "1px solid white",
    minWidth: 275,
    position: "relative",
    transition: "all .3s ease-in-out",

    "&:hover, &:active": {
      boxShadow: 5,
      transform: "translateY(5px)",

      ">div": {
        opacity: 1,
      },

      "&:before": { opacity: 1 },
    },

    "&:before": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      content: '""',
      display: "block",
      height: "100%",
      left: 0,
      opacity: 0,
      position: "absolute",
      transition: ".5s",
      top: 0,
      width: "100%",
      zIndex: 10,
    },
  },
  CardInfoContainer: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-end",
    opacity: 0,
    position: "absolute",
    top: 0,
    zIndex: 20,
    width: "calc(100% - 32px)",
  },
  CardLocationLabel: {
    color: grey[300],
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: 1.1,
    marginBottom: "4px",
  },
  CardLocationValue: { fontSize: "1.25rem", fontWeight: "700", lineHeight: 1.1, marginBottom: "8px" },
  CharacterName: { fontSize: "1.75rem", fontWeight: "600", lineHeight: 1.1, wordBreak: "break-word" },
  DetailsButton: {
    borderColor: "white",
    color: "white",
    fontWeight: 700,
    textTransform: "capitalize",
    width: "fit-content",

    "&:hover, &:active": {
      borderColor: "white",
    },
  },
}

const CharacterIntro: FC<Pick<Character, "name" | "status" | "species">> = ({ name, status, species }) => (
  <div aria-label='character-intro' style={{ marginBottom: "16px", position: "relative" }}>
    <Typography sx={styles.CharacterName}>{name}</Typography>
    <CharacterStatus
      status={status}
      getLabel={(status) => `${status} - ${species}`}
      labelStyle={{ fontSize: "1rem" }}
    />
  </div>
)

const CharacterCard: FC<Character & { openCharacterDialog: any }> = memo((props) => {
  const { image, location, name, openCharacterDialog, species, status } = props
  const { CardContainer, CardInfoContainer, CardLocationLabel, CardLocationValue, DetailsButton } = styles

  return (
    <Grid item xs={12} sm={6} md={4} xl={3} role='listitem'>
      <Card sx={CardContainer}>
        <CardMedia component='img' image={image} alt={name} loading='lazy' />
        <CardContent sx={CardInfoContainer}>
          <CharacterIntro name={name} status={status} species={species} />
          <Typography sx={CardLocationLabel}>Last known location:</Typography>
          <Typography component='span' sx={CardLocationValue}>
            {location.name}
          </Typography>
          <Button
            sx={DetailsButton}
            variant='outlined'
            onClick={() => openCharacterDialog(props)}
            title='Click to see more details'
          >
            More details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
