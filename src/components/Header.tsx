import { Container } from "@mui/material"
import { CSSProperties, FC } from "react"

const getHeaderStyle: (isVisible: boolean) => CSSProperties = (isVisible) => ({
  backgroundColor: "black",
  height: "100px",
  position: "sticky",
  top: isVisible ? "0" : "-150px",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "500ms",
  width: "100%",
  zIndex: 10,
})

const Header: FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <header style={getHeaderStyle(isVisible)}>
    <Container maxWidth='xl' sx={{ alignItems: "center", display: "flex", height: "100%" }}>
      <img src={process.env.PUBLIC_URL + "/img/logo.webp"} height='75' alt='Rick and Morty logo' />
    </Container>
  </header>
)

export default Header
