import { CSSProperties, FC } from "react"
import Typography from "@mui/material/Typography"
import { getStatusColor } from "../utils"
import Box from "@mui/material/Box"

const getDefaultStyles: (status: string) => { [key: string]: CSSProperties } = (status) => ({
  conatiner: {
    display: "flex",
    alignItems: "center",
  },
  dot: {
    backgroundColor: getStatusColor(status),
    borderRadius: "50%",
    display: "inline-block",
    height: "8px",
    marginBottom: "2px",
    marginRight: "6px",
    verticalAlign: "middle",
    width: "8px",
  },
  label: { fontSize: ".9rem", fontWeight: "500", lineHeight: 1.5, display: "inline", textTransform: "capitalize" },
})

const CharacterStatus: FC<{
  status: string
  getLabel?: (status: string) => string
  labelStyle?: CSSProperties
  dotStyle?: CSSProperties
  containerStyle?: CSSProperties
}> = ({ containerStyle = {}, dotStyle = {}, getLabel, labelStyle = {}, status }) => {
  const { container, dot, label } = getDefaultStyles(status)

  return (
    <Box sx={{ ...container, ...containerStyle }}>
      <div style={{ ...dot, ...dotStyle }} />
      <Typography sx={{ ...label, ...labelStyle }}>{getLabel ? getLabel(status) : status}</Typography>
    </Box>
  )
}

export default CharacterStatus
