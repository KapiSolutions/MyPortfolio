import React from "react";
import styles from "../../styles/layout/Header.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, Container, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { Locale } from "@/utils/interfaces/main";
import Lottie from "lottie-react";
import headerDark from "@/public/lotties/headerDark.json";
import headerLight from "@/public/lotties/headerLight.json"; 

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
      mainButton: "Explore projects",
    },
    pl: {
      p: "Full-Stack Developer & Mechatronic Systems Engineer",
      mainButton: "Pokaż projekty",
    },
    default: {},
  };

  return (
    <Box className={styles.container}>
      <Navbar />
      {/* , bottom: 0 */}
      {isMobile ? (
        <Box sx={{ opacity: 0.4, zIndex: -1, position: "absolute", maxHeight:"110vh", overflow: "hidden"  }}>
          {theme.palette.mode === "light" && (
            <Lottie
              animationData={headerLight}
              style={{ position: "relative", right: "200px", bottom: "450px", width: "450%", height: "450%" }}
            />
          )}
          {theme.palette.mode === "dark" && (
            <Lottie
              animationData={headerDark}
              style={{ position: "relative",right: "200px", bottom: "00px", width: "1000px"}}
            />
          )}
        </Box>
      ) : (
        <Box sx={{ opacity: 0.3, zIndex: -1, position: "absolute", maxHeight:"100vh", overflow: "hidden" }}>
          {theme.palette.mode === "light" && (
            <Lottie animationData={headerLight} style={{ position: "relative", bottom: "100px" }} />
          )}
          {theme.palette.mode === "dark" && (
            <Lottie
              animationData={headerDark}
              style={{ position: "relative", bottom: "100px", minWidth: "1100px", width: "100%"}}
            />
          )}
        </Box>
      )}
      <Container>
        <Stack spacing={isMobile ? 3 : 6} className={styles.parallaxContent}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ textTransform: "uppercase", fontWeight: "bold", fontSize: isMobile ? "11vw" : "auto" }}
          >
            Jakub Kapturkiewicz
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} mb={2}>
            {t[locale]?.p}
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ mt: isMobile ? 2 : 0 }}
              onClick={() => {
                if (router.route === "/") {
                  document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
                } else {
                  router.push("/#main");
                }
              }}
            >
              {t[locale].mainButton}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
