import { FC } from "react"
import Chip from "@mui/material/Chip"
import { SxProps } from "@mui/material"
import { Character } from "../types/rickAndMortyApiInterfaces"
import { CSSProperties } from "@mui/styled-engine"
import { getStatusColor, getStatusLabel } from "../utils"

const getChipStyle: (status: string, overrideStyles: CSSProperties) => SxProps = (status, overrideStyles) => ({
  ...overrideStyles,
  color: "white",
  backgroundColor: getStatusColor(status),
  borderColor: getStatusColor(status),
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "uppercase",
})

const CharacterStatusChip: FC<Pick<Character, "status"> & { overrideStyles?: CSSProperties }> = ({
  status,
  overrideStyles = {},
}) => <Chip sx={getChipStyle(status, overrideStyles)} label={getStatusLabel(status)} variant='outlined' />

export default CharacterStatusChip
