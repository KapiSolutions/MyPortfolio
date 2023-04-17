import React from "react";
import Image from "next/image";
import styles from "../../styles/layout/Header.module.scss";
// import cardsIcon from "../../../../public/img/cards-light.png";
import { useRouter } from "next/router";
import { useDeviceStore } from "../../stores/deviceStore";
import { Button, Typography } from "@mui/material";

import AdbIcon from "@mui/icons-material/Adb";
import Navbar from "./Navbar";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  locale: Locale;
};

const Header = ({ locale }: Props): JSX.Element => {
  const router = useRouter();
  const isMobile = useDeviceStore((state) => state.isMobile);
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
    <div className={styles.container}>
      <Navbar />
      <div className={styles.proposal}>
        <div className={`text-uppercase ${styles.parallaxContent}`}>
          <Typography mb={2} variant="h2">
            {t[locale]?.h}
          </Typography>
          <Typography variant="h6" mb={2}>{t[locale]?.p}</Typography>
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

          {/* <Typography mb={2} variant="body1">{t[locale]?.p}</Typography> */}
          {/* <Button
            variant="contained"
            onClick={() => {
              if (router.route === "/") {
                document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
              } else {
                router.push("/#main");
                // document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
              }
            }}
          >
            {t[locale]?.button}
          </Button> */}
          <br />
          <br />
          <AdbIcon fontSize="large" />
          {/* <Image
            src={cardsIcon}
            width="100"
            height="100"
            alt="Tarot Online - Bright Light Gypsy"
            title="Tarot Online - Bright Light Gypsy"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
