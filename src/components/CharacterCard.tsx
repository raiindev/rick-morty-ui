import { FC, memo } from "react"
import { Card, CardContent, CardMedia, Grid, SxProps, Typography } from "@mui/material"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { blueGrey, grey } from "@mui/material/colors"
import CharacterStatusChip from "./CharacterStatusChip"

interface CustomStyles {
  [key: string]: SxProps<{}>
}

const styles: CustomStyles = {
  CharacterCardContainer: {
    cursor: "pointer",
    minWidth: 275,
    transition: "all .2s ease-in-out",

    "&:hover": {
      boxShadow: 5,
      transform: "scale(1.02)",
    },
  },
  CharacterCard: {
    color: grey[100],
    display: "flex",
    padding: "0 !important",
    backgroundColor: blueGrey["700"],
  },
  CharacterCardImage: {
    height: "200px",
    width: "200px",
  },
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

  return (
    <Grid item xs={12} sm={12} md={6} xl={4}>
      <Card
        sx={styles.CharacterCardContainer}
        onClick={() => openCharacterDialog(props)}
        title='Click to see more details'
      >
        <CardContent sx={styles.CharacterCard}>
          <CardMedia
            component='img'
            height='194'
            image={image}
            alt={name}
            sx={styles.CharacterCardImage}
            loading='lazy'
          />
          <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CharacterIntro name={name} status={status} />
            <Typography
              sx={{
                color: grey[300],
                fontSize: ".75rem",
                fontWeight: "500",
                lineHeight: 1.5,
              }}
            >
              Species:
            </Typography>
            <Typography sx={{ fontWeight: "700", lineHeight: 1.1 }}>{species}</Typography>
            <Typography
              sx={{
                color: grey[300],
                fontSize: ".95rem",
                fontWeight: "500",
                lineHeight: 1.1,
                marginBottom: "4px",
                marginTop: "auto",
              }}
            >
              Last known location:
            </Typography>
            <Typography component='span' sx={{ fontSize: "1.2rem", fontWeight: "700", lineHeight: 1.1 }}>
              {location.name}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
