import { FC, CSSProperties } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { grey } from "@mui/material/colors"
import { SxProps } from "@mui/material"
import Search from "@mui/icons-material/Search"

const getHeaderStyle: (isVisible: boolean) => CSSProperties = (isVisible) => ({
  backgroundColor: "black",
  height: "100px",
  position: "fixed",
  top: isVisible ? "0" : "-150px",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "500ms",
  width: "100%",
  zIndex: 30,
})

const searchBoxStyle: SxProps = {
  alignItems: "center",
  color: grey[200],
  display: "flex",
  marginRight: "16px",

  svg: {
    fontSize: "1.75rem",
    marginRight: "4px",
  },

  "& input": {
    backgroundColor: grey[200],
    border: 0,
    borderRadius: "20px",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1.25rem",
    height: "25px",
    padding: "5px 8px",
    width: "200px",

    ":focus": {
      outlineWidth: "thin",
    },
  },
}

const Header: FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <header style={getHeaderStyle(isVisible)}>
    <Container
      maxWidth='xl'
      sx={{ alignItems: "center", display: "flex", height: "100%", justifyContent: "space-between" }}
    >
      <img src={process.env.PUBLIC_URL + "/img/logo.webp"} height='75' alt='Rick and Morty logo' />
      <Box sx={searchBoxStyle}>
        <Search />
        <input placeholder='Search..' aria-label='ok' />
      </Box>
    </Container>
  </header>
)

export default Header
