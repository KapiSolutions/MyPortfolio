import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import type { Locale } from "@/utils/i18n";
import Link from "next/link";

type Lang = {
  en: string | Array<string>;
  pl: string | Array<string>;
};
type Button = {
  text: Lang;
  url: string;
  newPage: boolean;
};
interface Slide {
  title: Lang;
  desc: Lang;
  buttons: Array<Button>;
  images: {
    desktop: string;
    mobile: string;
  };
}
type Props = {
  slide: Slide;
};

const CarouselSlide = ({ slide }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

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
      background: `linear-gradient(180deg, transparent 50%, ${theme.palette.background.default} 100%)`,
    },
  };
  return (
    <Box
      sx={styles.wrapper}
      style={{ backgroundImage: `url("${isMobile ? slide.images.mobile : slide.images.desktop}")` }}
    >
      <Box sx={styles.overlay} />
      <Box
        sx={{
          zIndex: 1,
          mb: 6,
          p: 3,
          width: "100%",
          background: `linear-gradient(330deg, transparent ${isMobile ? "" : "20%"}, ${
            theme.palette.background.default
          } 100%)`,
        }}
      >
        <Stack spacing={2} sx={{ width: isMobile ? "100%" : "60%" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ textTransform: "uppercase", fontSize: isMobile ? "9vw" : "auto" }}
          >
            {slide.title[locale]}
          </Typography>

          <Typography variant="body1">{slide.desc[locale]}</Typography>

          {/* Actions */}
          <Stack direction="row" justifyContent="flex-start" alignItems="center" useFlexGap flexWrap="wrap" spacing={2}>
            {slide.buttons.map((button, idx) => (
              <Link
                target={button.newPage ? "_blank" : "_self"}
                rel={button.newPage ? "noopener noreferrer" : "next"}
                href={button.url}
                key={idx}
              >
                <Button variant="contained" size={slide.buttons.length > 1 ? "small" : "medium"} color="primary">
                  {button.text[locale]}
                </Button>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CarouselSlide;
