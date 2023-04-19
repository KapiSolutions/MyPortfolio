import React from "react";
import styles from "../../styles/layout/Header.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import Navbar from "./Navbar";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  locale: Locale;
};

const Header = ({ locale }: Props): JSX.Element => {
  const router = useRouter();
  const t = {
    en: {
      h: "I'm Kuba",
      p: "Full-Stack Developer & Mechatronic Systems Engineer",
      button: "Contact me",
    },
    pl: {
      h: "Kuba",
      p: "Full-Stack Developer & Mechatronic Systems Engineer",
      button: "Contact me",
    },
  };
  return (
    <Box className={styles.container}>
      <Navbar />
      <Box className={styles.parallaxContent}>
        <Typography mb={2} variant="h2">
          {t[locale]?.h}
        </Typography>
        <Typography variant="h6" mb={2}>
          {t[locale]?.p}
        </Typography>
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
          Contact Me
        </Button>
        <br />
        <br />
        <AdbIcon fontSize="large" />
      </Box>
    </Box>
  );
};

export default Header;
