import { FC } from "react"
import logo from "../images/logo.webp"

const Header: FC<{}> = () => {
  return (
    <header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        height: "150px",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 10,
      }}
    >
      <img src={logo} alt='Rick and Morty logo' />
    </header>
  )
}

export default Header
