import { FC } from "react"

const Header: FC<{ isVisible: boolean }> = (isVisible) => {
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
      <img src={process.env.PUBLIC_URL + "/img/logo.webp"} alt='Rick and Morty logo' />
    </header>
  )
}

export default Header
