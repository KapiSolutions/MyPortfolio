import React from "react";
import styles from "../../styles/layout/Header.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, Container, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

type Props = {
  locale: Locale;
};

const Header = ({ locale }: Props): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = (key: Tkey) => getTranslation(locale, key);
  const lottiePath = "/lotties/header.lottie";

  const handleScroll = async () => {
    if (router.pathname === "/") {
      const element = document.getElementsByName("projects")[0];
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    } else {
      await router.push("/", undefined, { scroll: false });
      const element = document.getElementsByName("projects")[0];
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    }
  };

  return (
    <Box className={styles.container}>
      <Navbar />
      {isMobile ? (
        <Box
          sx={{
            opacity: 0.4,
            zIndex: -1,
            position: "absolute",
            maxWidth: "100vw",
            maxHeight: "110vh",
            overflow: "hidden",
            maskImage: `linear-gradient(0deg, transparent 1%, ${theme.palette.background.default} 10%)`,
          }}
        >
          <DotLottiePlayer
            src={lottiePath}
            autoplay
            loop
            style={{
              position: "relative",
              right: "200px",
              bottom: "450px",
              width: "1700px",
              filter: theme.palette.mode === "dark" ? "invert(100%) opacity(80%) grayscale(100%)" : "none",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            opacity: 0.3,
            zIndex: -1,
            position: "absolute",
            maxHeight: "105vh",
            overflow: "hidden",
            maskImage: `linear-gradient(0deg, transparent 1%, ${theme.palette.background.default} 10%)`,
          }}
        >
          <DotLottiePlayer
            src={lottiePath}
            autoplay
            loop
            style={{
              position: "relative",
              bottom: "100px",
              minWidth: "800px",
              filter: theme.palette.mode === "dark" ? "invert(100%) opacity(80%) grayscale(100%)" : "none",
            }}
          />
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
            {t("header.job-title")}
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ mt: isMobile ? 2 : 0 }}
              onClick={handleScroll}
            >
              {t("header.button")}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
