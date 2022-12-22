import { FC, memo } from "react"
import { Card, CardContent, CardMedia, Grid, SxProps, Typography } from "@mui/material"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { blueGrey, green, grey, red } from "@mui/material/colors"

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

const getStatusColor: (status: string) => string = (status) => {
  switch (status) {
    case "Alive":
      return green["700"]
    case "Dead":
      return red["400"]
    default:
      return grey["500"]
  }
}

const CharacterIntro: FC<Pick<Character, "name" | "status">> = ({ name, status }) => (
  <div style={{ marginBottom: "4px", position: "relative" }}>
    <Typography sx={{ fontSize: "20px", fontWeight: "600", lineHeight: 1.1, maxWidth: "60%" }}>{name}</Typography>
    <Typography
      sx={{
        border: `2px dashed ${getStatusColor(status)}`,
        borderRadius: "5px",
        color: getStatusColor(status),
        fontFamily: "Dosis, sans-serif",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: 1,
        padding: "5px",
        position: "absolute",
        right: 0,
        textTransform: "uppercase",
        top: 0,
      }}
    >
      {status === "Dead" ? "Decesead" : status}
    </Typography>
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
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: 1.5,
              }}
            >
              Species:
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "700", lineHeight: 1.1 }}>{species}</Typography>
            <Typography
              sx={{
                color: grey[300],
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: 1.1,
                marginBottom: "4px",
                marginTop: "auto",
              }}
            >
              Last known location:
            </Typography>
            <Typography component='span' sx={{ fontSize: "18px", fontWeight: "700", lineHeight: 1.1 }}>
              {location.name}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
