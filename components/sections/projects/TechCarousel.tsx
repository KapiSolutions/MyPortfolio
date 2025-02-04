import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import getIcon from "@/utils/getIcon";

//Styles for the tech icons
const iconStyle = {
  techIcon: {
    width: 24,
    height: 24,
  },
};

const tech = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Next.js",
  "React",
  "Svelte",
  "Html",
  "Css",
  "Sass",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Stripe",
  "OpenAi",
];

const TechCarousel = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const carouselSlides = () => {
    const qt = isMobile ? 3 : 4;
    const sliderItems: number = tech.length > qt ? qt : tech.length;
    const items: Array<JSX.Element> = [];

    for (let i = 0; i < tech.length; i += sliderItems) {
      if (i % sliderItems === 0) {
        items.push(
          <Stack direction="row" justifyContent="space-evenly" alignItems="center" sx={{ mt: 1 }} key={i}>
            {tech.slice(i, i + sliderItems).map((item, index) => {
              return (
                <Stack alignItems="center" spacing={1} key={index} sx={{ width: 40 }}>
                  {getIcon(item.toLowerCase(), iconStyle)}
                  <Typography variant="body1">{item}</Typography>
                </Stack>
              );
            })}
          </Stack>
        );
      }
    }
    return items;
  };
  return (
    <Box sx={{ display: "flex", minHeight: "20vh" }}>
      <Carousel
        autoPlay={true}
        indicators={false}
        animation="fade"
        duration={2000}
        stopAutoPlayOnHover={false}
        sx={{ m: "auto", height: 70, width: "100%" }}
      >
        {carouselSlides()}
      </Carousel>
    </Box>
  );
};

export default TechCarousel;
