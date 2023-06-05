import React from "react";
import styles from "../../styles/layout/Header.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import Navbar from "./Navbar";
import { Locale } from "@/utils/interfaces/main";

//Define Types:
type Props = {
  locale: Locale;
};

const Header = ({ locale }: Props): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      p: "Full-Stack Developer & Mechatronic Systems Engineer",
      button: "Contact me",
    },
    pl: {
      p: "Full-Stack Developer & Mechatronic Systems Engineer",
      button: "Contact me",
    },
  };
  return (
    <Box className={styles.container}>
      <Navbar />
      <Stack spacing={isMobile ? 3 : 6} className={styles.parallaxContent}>
        <Typography variant={isMobile ? "h3" : "h2"}>Jakub Kapturkiewicz</Typography>
        <Typography variant={isMobile ? "body1" : "h6"} mb={2}>
          {t[locale]?.p}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (router.route === "/") {
                document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
              } else {
                router.push("/#main");
                // document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
              }
            }}
          >
            Explore Projects
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
