import React, { FC, ReactNode } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 621,
      md: 917,
      lg: 992,
      xl: 1200,
    },
  },
})

const CustomThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
