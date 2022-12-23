import { CSSProperties, FC } from "react"
import Typography from "@mui/material/Typography"
import { getStatusColor } from "../utils"

const getDefaultStyles: (status: string) => { [key: string]: CSSProperties } = (status) => ({
  dot: {
    backgroundColor: getStatusColor(status),
    borderRadius: "50%",
    display: "inline-block",
    height: "8px",
    marginBottom: "2px",
    marginRight: "5px",
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
}> = ({ status, getLabel, labelStyle = {}, dotStyle = {} }) => {
  const { dot, label } = getDefaultStyles(status)

  return (
    <>
      <div style={{ ...dot, ...dotStyle }} />
      <Typography sx={{ ...label, ...labelStyle }}>{getLabel ? getLabel(status) : status}</Typography>
    </>
  )
}

export default CharacterStatus
