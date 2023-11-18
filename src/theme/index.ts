import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    green: {
      100: "#012626",
      200: "#001B1B",
    },
    yellow: {
      100: "#BFA288",
      200: "##F2AC29",
      300: "##BF6A1F",
    },
  },
  fonts: {
    heading: "Montserrat_700Bold",
    body: "Montserrat_400Regular",
    mono: "OpenSans_600SemiBold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});
