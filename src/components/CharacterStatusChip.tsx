import { FC } from "react"
import Chip from "@mui/material/Chip"
import { green, grey, red } from "@mui/material/colors"
import { SxProps } from "@mui/material"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { CSSProperties } from "@mui/styled-engine"

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

const getChipStyle: (status: string, overrideStyles: CSSProperties) => SxProps = (status, overrideStyles) => ({
  ...overrideStyles,
  color: "white",
  backgroundColor: getStatusColor(status),
  borderColor: getStatusColor(status),
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "uppercase",
})

const getStatusLabel = (status: string) => (status === "Dead" ? "Deceased" : status)

const CharacterStatusChip: FC<Pick<Character, "status"> & { overrideStyles?: CSSProperties }> = ({
  status,
  overrideStyles = {},
}) => <Chip sx={getChipStyle(status, overrideStyles)} label={getStatusLabel(status)} variant='outlined' />

export default CharacterStatusChip
