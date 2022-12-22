import { FC, memo } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { blueGrey, grey } from "@mui/material/colors"
import CharacterStatusChip from "./CharacterStatusChip"
import { CustomStyles } from "../utils"

const styles: CustomStyles = {
  CardContainer: {
    cursor: "pointer",
    minWidth: 275,
    transition: "all .2s ease-in-out",

    "&:hover": {
      boxShadow: 5,
      transform: "scale(1.02)",
    },
  },
  CharacterCardContent: {
    color: grey[100],
    display: "flex",
    padding: "0 !important",
    backgroundColor: blueGrey["700"],
  },
  CardImage: {
    height: "200px",
    width: "200px",
  },
  CardInfoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  CardSpeciesLabel: {
    color: grey[300],
    fontSize: ".75rem",
    fontWeight: "500",
    lineHeight: 1.5,
  },
  CardSpeciesValue: {
    fontWeight: "700",
    lineHeight: 1.1,
  },
  CardLocationLabel: {
    color: grey[300],
    fontSize: ".95rem",
    fontWeight: "500",
    lineHeight: 1.1,
    marginBottom: "4px",
    marginTop: "auto",
  },
  CardLocationValue: { fontSize: "1.2rem", fontWeight: "700", lineHeight: 1.1 },
}

const CharacterIntro: FC<Pick<Character, "name" | "status">> = ({ name, status }) => (
  <div aria-label='character-intro' style={{ marginBottom: "4px", position: "relative" }}>
    <Typography sx={{ fontSize: "1.25rem", fontWeight: "600", lineHeight: 1.1, maxWidth: "60%" }}>{name}</Typography>
    <CharacterStatusChip
      status={status}
      overrideStyles={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    />
  </div>
)

const CharacterCard: FC<Character & { openCharacterDialog: any }> = memo((props) => {
  const { image, location, name, openCharacterDialog, species, status } = props
  const {
    CardContainer,
    CardImage,
    CardInfoContainer,
    CardSpeciesLabel,
    CardSpeciesValue,
    CardLocationLabel,
    CardLocationValue,
    CharacterCardContent,
  } = styles

  return (
    <Grid item xs={12} sm={12} md={6} xl={4} role='listitem'>
      <Card sx={CardContainer} onClick={() => openCharacterDialog(props)} title='Click to see more details'>
        <CardContent sx={CharacterCardContent}>
          <CardMedia component='img' image={image} alt={name} sx={CardImage} loading='lazy' />
          <CardContent sx={CardInfoContainer}>
            <CharacterIntro name={name} status={status} />
            <Typography sx={CardSpeciesLabel}>Species:</Typography>
            <Typography sx={CardSpeciesValue}>{species}</Typography>
            <Typography sx={CardLocationLabel}>Last known location:</Typography>
            <Typography component='span' sx={CardLocationValue}>
              {location.name}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
