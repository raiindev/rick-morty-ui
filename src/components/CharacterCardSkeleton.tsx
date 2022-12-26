import React, { FC } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"

const CharacterCardSkeleton: FC<{}> = () => (
  <Grid component='li' item xs={12} sm={12} md={6} xl={4} sx={{ display: "flex" }}>
    <Skeleton animation='wave' variant='rounded' width={200} height={200} />
    <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
      <Skeleton animation='wave' variant='text' width={250} sx={{ fontSize: "1.35rem" }} />
      <Skeleton animation='wave' variant='text' width={250} sx={{ fontSize: ".75rem" }} />
      <Skeleton animation='wave' variant='text' width={250} sx={{ fontSize: "1.15rem" }} />
      <Skeleton animation='wave' variant='text' width={250} sx={{ fontSize: ".95rem", marginTop: "auto" }} />
      <Skeleton animation='wave' variant='text' width={250} sx={{ fontSize: "1.2rem" }} />
    </Box>
  </Grid>
)

export default CharacterCardSkeleton
