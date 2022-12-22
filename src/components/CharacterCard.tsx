import { FC, memo } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { Character } from "../types/rickAndMortyApiInterfaces"
import "../styles/CharacterCard.scss"

const CharacterCard: FC<Character & { openCharacterDialog: any }> = memo((props) => {
  const { name, image, openCharacterDialog } = props

  return (
    <Grid item xs={12} sm={6} md={4} xl={3} className='character-card--container'>
      <Card sx={{ minWidth: 275 }} onClick={() => openCharacterDialog(props)}>
        <CardContent className='character-card'>
          <CardMedia className='character-card--image' component='img' height='194' image={image} alt={name} />
          <Typography>{name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default CharacterCard
