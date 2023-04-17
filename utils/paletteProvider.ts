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
          // primary: { main: "#90caf9" }, //buttons
          divider: "rgba(0, 0, 0, 0.12)",
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
            disabled: "rgba(0, 0, 0, 0.38)",
          },
          // action: {
          //   active: "rgba(0, 0, 0, 0.54)",
          //   hover: "rgba(0, 0, 0, 0.04)",
          //   selected: "rgba(0, 0, 0, 0.08)",
          //   disabled: "rgba(0, 0, 0, 0.26)",
          //   disabledBackground: "rgba(0, 0, 0, 0.12)",
          // }
        }
      : {
          // palette values for dark mode
          // primary: { main: "#90caf9" },
          divider: "rgba(255, 255, 255, 0.12)",
          background: {
            default: "#121212",
            paper: "#121212",
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
