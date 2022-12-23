import { FC, memo } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { blueGrey, grey } from "@mui/material/colors"
import { CustomStyles } from "../utils"
import CharacterStatus from "./CharacterStatus"

const styles: CustomStyles = {
  CardContainer: {
    borderRadius: "4px",
    cursor: "pointer",
    minWidth: 275,
    position: "relative",
    transition: "all .3s ease-in-out",

    "&:hover": {
      boxShadow: 5,
      transform: "translateY(5px)",

      ">div": {
        opacity: 1,
      },

      "&:before": { opacity: 1 },
    },

    "&:before": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "4px",
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
    height: "calc(100% - 32px)",
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
  CardLocationValue: { fontSize: "1.5rem", fontWeight: "700", lineHeight: 1.1 },
  CharacterName: { fontSize: "2rem", fontWeight: "600", lineHeight: 1.1 },
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
  const { CardContainer, CardInfoContainer, CardLocationLabel, CardLocationValue } = styles

  return (
    <Grid item xs={12} sm={12} md={6} xl={3} role='listitem'>
      <Card sx={CardContainer} onClick={() => openCharacterDialog(props)} title='Click to see more details'>
        <CardMedia component='img' image={image} alt={name} loading='lazy' />
        <CardContent sx={CardInfoContainer}>
          <CharacterIntro name={name} status={status} species={species} />
          <Typography sx={CardLocationLabel}>Last known location:</Typography>
          <Typography component='span' sx={CardLocationValue}>
            {location.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
