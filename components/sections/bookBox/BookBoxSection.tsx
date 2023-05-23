import React from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Locale } from "@/interfaces/main";
import img from "../../public/img/bookbox-section/1.png";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";

const BookBoxSection = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      h1: "BookBox Library",
      p1: "The family of products tailored to the needs of both libraries and their users",
      b1: "Online Catalogue",
      h2: "BookBox Library",
      p2: "Social Links",
      b2: "first link",
    },
    pl: {
      h1: "BookBox Library",
      p1: "Rodzina produktów dostosowana do potrzeb bibliotek oraz czytelników",
      b1: "Katalog online",
      h2: "BookBox Library",
      p2: "Social Links",
      b2: "first link",
    },
    default: {},
  };

  const styles = {
    wrapper: {
      position: "relative",
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      alignItems: "end",
      justifyContent: "left",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9))",
    },
  };
  return (
    <Carousel
      autoPlay={true}
      indicators={true}
      stopAutoPlayOnHover={true}
      navButtonsAlwaysVisible={false}
      animation="fade"
      swipe={false}
      duration={400}
      sx={{ m: "auto", height: "100vh", width: "100vw" }}
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          position: "absolute",
          bottom: "30px",
        },
      }}
      navButtonsWrapperProps={{
        style: {
          paddingRight: "15px",
        },
      }}
    >
      <Box
        sx={styles.wrapper}
        style={{ backgroundImage: `url("img/bookbox-section/slide1${isMobile ? "mobile" : ""}.png")` }}
      >
        <Box sx={styles.overlay} />
        <Container sx={{ zIndex: 1, mb: 10 }}>
          <Stack spacing={2}>
            <Typography variant="h4" component="h1">
              BookBox Library
            </Typography>
            <Typography variant="body1">
              The family of products tailored to the needs of both libraries and their users
            </Typography>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/104EoBYCOkScEQ_DSHjN-dfhq0YiIOKIy/view?usp=sharing"
            >
              <Button variant="outlined" color="inherit">
                Online Catalogue
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={styles.wrapper}
        style={{ backgroundImage: `url("img/bookbox-section/slide2${isMobile ? "mobile" : ""}.jpg")` }}
      >
        <Box sx={styles.overlay} />
        <Container sx={{ zIndex: 1, mb: 10 }}>
          <Stack spacing={2}>
            <Typography variant="h4" component="h1">
              BookBox Library cdn
            </Typography>
            <Typography variant="body1">
              The family of products tailored to the needs of both libraries and their users
            </Typography>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/104EoBYCOkScEQ_DSHjN-dfhq0YiIOKIy/view?usp=sharing"
            >
              <Button variant="outlined" color="inherit">
                Online Catalogue
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>
    </Carousel>
  );
};

export default BookBoxSection;
