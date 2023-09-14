import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  TbBrandNextjs,
  TbBrandRedux,
  TbBrandBootstrap,
  TbBrandCss3,
  TbBrandHtml5,
  TbBrandMongodb,
  TbBrandFirebase,
  TbBrandPhp,
  TbBrandMysql,
} from "react-icons/tb";
import { FaNodeJs, FaReact, FaStripe, FaRaspberryPi, FaSass } from "react-icons/fa";
import { SiJavascript, SiTypescript } from "react-icons/si";

//Styles
const styles = {
  techIcon: {
    width: 24,
    height: 24,
  },
};

const tech = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Next.js",
  "React",
  "Redux",
  "Bootstrap",
  "Html",
  "Css",
  "Sass",
  "Php",
  "MySql",
  "MongoDB",
  "Firebase",
  "Stripe",
  "Raspberry",
];

const TechCarousel = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const getIcon = (tech: string): JSX.Element | null => {
    switch (tech) {
      case "React":
        return <FaReact style={styles.techIcon} />;
      case "Next.js":
        return <TbBrandNextjs style={styles.techIcon} />;
      case "Node.js":
        return <FaNodeJs style={styles.techIcon} />;
      case "Redux":
        return <TbBrandRedux style={styles.techIcon} />;
      case "Bootstrap":
        return <TbBrandBootstrap style={styles.techIcon} />;
      case "Sass":
        return <FaSass style={styles.techIcon} />;
      case "Css":
        return <TbBrandCss3 style={styles.techIcon} />;
      case "Html":
        return <TbBrandHtml5 style={styles.techIcon} />;
      case "JavaScript":
        return <SiJavascript style={styles.techIcon} />;
      case "TypeScript":
        return <SiTypescript style={styles.techIcon} />;
      case "Php":
        return <TbBrandPhp style={styles.techIcon} />;
      case "MySql":
        return <TbBrandMysql style={styles.techIcon} />;
      case "MongoDB":
        return <TbBrandMongodb style={styles.techIcon} />;
      case "Firebase":
        return <TbBrandFirebase style={styles.techIcon} />;
      case "Stripe":
        return <FaStripe style={styles.techIcon} />;
      case "Raspberry":
        return <FaRaspberryPi style={styles.techIcon} />;
      default:
        return null;
    }
  };
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
                  {getIcon(item)}
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
