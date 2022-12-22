import React, { FC, ReactNode } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
})

const CustomThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
