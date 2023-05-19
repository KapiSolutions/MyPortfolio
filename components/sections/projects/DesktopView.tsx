import React, { useState, useEffect } from "react";
import { Grid, useTheme, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProjectPaper from "../../ProjectPaper";
import { Projects } from "@/interfaces/projects";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

//Define Types
type Props = {
  projects: Projects;
};

const DesktopView = ({ projects }: Props): JSX.Element => {
  const [slides, setSlides] = useState<Array<JSX.Element>>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const carouselSlides = () => {
    const qt = isMobile ? 2 : 3;
    const sliderItems: number = projects.length > qt ? qt : projects.length;
    const items: Array<JSX.Element> = [];

    for (let i = 0; i < projects.length; i += sliderItems) {
      if (i % sliderItems === 0) {
        items.push(
          <Grid container spacing={2} key={i.toString()} sx={{ pl: 1, pr: 1 }}>
            {projects.slice(i, i + sliderItems).map((project, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index.toString()}>
                  <ProjectPaper project={project} />
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }
    setSlides(items);
  };

  useEffect(() => {
    carouselSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <Carousel
      autoPlay={false}
      cycleNavigation={false}
      animation="slide"
      sx={{ width: "100%", height: 360, pt: 3 }}
      IndicatorIcon={<HorizontalRuleIcon />}
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          position: "absolute",
          top: "-18px",
          paddingRight: "10px",
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        },
      }}
    >
      {slides}
    </Carousel>
  );
};

export default DesktopView;
