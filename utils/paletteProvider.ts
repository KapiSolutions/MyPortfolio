import { PaletteMode } from "@mui/material";

const paletteProvider = (mode: PaletteMode) => ({
  typography: {
    fontFamily: "k2d",
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          //Light mode
          divider: "rgba(0, 0, 0, 0.12)",
          background: {
            default: "#fafafa",
            paper: "#fff",
            nav: " rgba(255, 255, 255, 0.75)",
            contrast: "rgba(255, 255, 255, 0.75)",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
            disabled: "rgba(0, 0, 0, 0.38)",
          },
          primary: {
            main: "#121212",
            dark: "#000000",
          },
        }
      : {
          //Dark mode
          divider: "rgba(255, 255, 255, 0.12)",
          background: {
            default: "#121212",
            paper: "#121212",
            nav: "rgba(18, 18, 18, 0.75)",
            contrast: "rgb(0, 0, 0, 0.9)",
          },
          text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
          },
        }),
  },
});

export default paletteProvider;
