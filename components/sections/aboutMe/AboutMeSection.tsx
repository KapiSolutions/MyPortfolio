import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, Stack, Box, useTheme, useMediaQuery, Divider } from "@mui/material";
import { Locale } from "@/utils/interfaces/main";
import sections from "./aboutMe.json";
import Image from "next/image";
import img1 from "@/public/img/aboutme-section/1c.png";
import img2 from "@/public/img/aboutme-section/2a.png";
import img3 from "@/public/img/aboutme-section/3.png";
const images = [img1, img2, img3];

const AboutMeSection = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      h: "About me",
    },
    pl: {
      h: "O mnie",
    },
  };
  function isEven(n: number) {
    return n % 2 == 0;
  }
  return (
    <Container name="aboutMeSection">
      <Typography variant="h2">{t[locale]?.h}</Typography>
      <Stack spacing={4} alignItems="center" sx={{ margin: "auto", mt: 2, width: isMobile ? "100%" : "90%" }}>
        {sections.map((item, idx) => (
          <Box key={idx} sx={{ width: "100%" }}>
            <Stack
              direction={isMobile ? "column" : isEven(idx + 1) ? "row-reverse" : "row"}
              justifyContent={isMobile ? "center" : isEven(idx + 1) ? "flex-end" : "flex-start"}
              alignItems="center"
              spacing={3}
              sx={{ width: "100%", height: "100vh" }}
            >
              <Box
                component="div"
                sx={{
                  position: "relative",
                  width: isMobile ? "100%" : "25%",
                  height: isMobile ? "200px" : "70vh",
                  margin: isMobile ? "auto" : 0,
                }}
              >
                <Image
                  src={images[idx]}
                  alt="About me image"
                  fill
                  style={{ objectFit: "cover", filter: "grayscale(50%) opacity(80%)" }}
                />
              </Box>

              <Stack spacing={2} sx={{ width: isMobile ? "100%" : "75%" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  align={isEven(idx + 1) ? (isMobile ? "left" : "right") : "left"}
                >
                  {item.title[locale]}
                </Typography>
                <Typography variant="body1" align="justify">
                  {item.p1[locale]}
                </Typography>

                {item.p2[locale] === "" ? null : (
                  <Typography variant="body1" align="justify">
                    {item.p2[locale]}
                  </Typography>
                )}
              </Stack>
            </Stack>
            {idx < sections.length - 1 ? <Divider flexItem sx={{ mt: 4 }} /> : null}
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default AboutMeSection;
