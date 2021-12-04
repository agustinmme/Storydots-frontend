import { extendTheme } from "@chakra-ui/react"
import "@fontsource/poppins"

const theme = extendTheme({
  colors: {
    primary: {
      50: "#ecefff",
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819"
    },
    secondary: {
      50: "#FFF5F7",
      100: "#FED7E2",
      200: "#FBB6CE",
      300: "#F687B3",
      400: "#ED64A6",
      500: "#D53F8C",
      600: "#c646a3",
      700: "#97266D",
      800: "#702459",
      900: "#521B41"
    },
    "bg-simple":"#F9FAFB"
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
})
export default theme;