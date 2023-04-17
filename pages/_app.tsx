import React, { useMemo } from "react";
import "@/styles/main.scss";
import "@fontsource/k2d";
import Layout from "../components/layout/Layout";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDeviceStore } from "@/stores/deviceStore";
import paletteProvider from "@/utils/paletteProvider";
// Import types
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const themeState = useDeviceStore((state) => state.themeState);
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(paletteProvider(themeState)), [themeState]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
