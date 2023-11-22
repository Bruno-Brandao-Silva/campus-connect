import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    green: {
      100: "#012626",
      200: "#001B1B",
    },
    yellow: {
      50: "rgba(191, 162, 136, 0.4)",
      100: "#BFA288",
      200: "#F2AC29",
      300: "#BF6A1F",
    },
    red: {
      400: "#731702",
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
    18: 72,
    36: 136,
  },
});
