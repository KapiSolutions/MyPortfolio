import { PaletteMode } from "@mui/material";
// import { amber, deepOrange, grey } from "@mui/material/colors";

const paletteProvider = (mode: PaletteMode) => ({
  typography: {
    fontFamily: "k2d",
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          divider: "rgba(0, 0, 0, 0.12)",
          background: {
            default: "#fafafa",
            paper: "#fff",
            nav: " rgba(255, 255, 255, 0.75)",
          },
          primary: {
            main: "#121212",
            dark: "#000000",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
            disabled: "rgba(0, 0, 0, 0.38)",
          },
        }
      : {
          // palette values for dark mode
          divider: "rgba(255, 255, 255, 0.12)",
          background: {
            default: "#121212",
            paper: "#121212",
            nav: "rgba(18, 18, 18, 0.75)",
          },
          text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
          },
          // action: {
          //   active: "#fff",
          //   hover: "rgba(255, 255, 255, 0.08)",
          //   selected: "rgba(255, 255, 255, 0.16)",
          //   disabled: "rgba(255, 255, 255, 0.3)",
          //   disabledBackground: "rgba(255, 255, 255, 0.12)",
          // },
        }),
  },
});

export default paletteProvider;
