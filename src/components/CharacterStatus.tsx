import React, { FC } from "react"
import Typography from "@mui/material/Typography"
import { getStatusColor } from "../utils"

const CharacterStatus: FC<{ status: string; label?: (status: string) => string }> = ({ status, label }) => (
  <>
    <div
      style={{
        backgroundColor: getStatusColor(status),
        borderRadius: "50%",
        display: "inline-block",
        height: "8px",
        marginRight: "5px",
        width: "8px",
      }}
    />
    <Typography sx={{ fontSize: ".9rem", fontWeight: "500", lineHeight: 1.5, display: "inline" }}>
      {label ? label(status) : status}
    </Typography>
  </>
)

export default CharacterStatus
