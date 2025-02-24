import React, { useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/layout/grid.module.scss";
import { useRouter } from "next/router";
import type { Locale } from "@/utils/i18n";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import paletteProvider from "@/utils/paletteProvider";
import { useAppSelector } from "../../store/hooks";
import { Box } from "@mui/material";
import { NextSeo } from "next-seo";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const themeState = useAppSelector((state) => state.device.theme);
  const theme = useMemo(() => createTheme(paletteProvider(themeState)), [themeState]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextSeo
        title="Kapisolutions"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "favicon.svg",
          },
        ]}
      />
      <Box className={styles.container}>
        <Header locale={locale} />
        <Box component="main" name="main" className={styles.main} sx={{ pt: 2, pb: 8 }}>
          {children}
        </Box>
        <Footer locale={locale} />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
