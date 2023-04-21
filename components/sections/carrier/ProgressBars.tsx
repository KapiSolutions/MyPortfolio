import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Locale } from "@/interfaces/main";
import { Carrier } from "@/interfaces/carrier";
//Define Types:
type Props = {
  locale: Locale;
  carrier: Carrier;
};

export const ProgressBars = ({ locale, carrier }: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [empProjects, setEmpProjects] = useState(0); //Projects as Employee
  const [freProjects, setFreProjects] = useState(0); //Projects as Freelancer
  const [protProjects, setProtProjects] = useState(0); //Prototypes

  const getProjects = () => {
    let employee = 0;
    let freelancer = 0;
    let prototypes = 0;
    carrier.map((item, idx) => {
      switch (item.type) {
        case "job":
          employee = employee + item.projectsDone;
          break;
        case "freelancer":
          freelancer = freelancer + item.projectsDone;
          break;
        case "study":
          prototypes = prototypes + item.projectsDone;
          break;
        default:
          break;
      }
    });
    setEmpProjects(employee);
    setFreProjects(freelancer);
    setProtProjects(prototypes);
  };

  // Check if the progress bar section is visible in the current viewport
  const checkPosition = () => {
    const actPos = window.scrollY; //Actual scroll position
    const windowHeight = window.innerHeight; //Window height
    const elementPos = document.getElementsByName("carrierProjectsDone")[0].offsetTop; //Element position
    // If visible, fire up the progress bars
    if (actPos + windowHeight - 140 >= elementPos) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    getProjects();
    window.addEventListener("scroll", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer =
      progress < 100 && isVisible
        ? setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
          }, 10)
        : undefined;
    return () => {
      clearInterval(timer);
    };
  }, [progress, isVisible]);

  const t = {
    en: {
      projects: "Projects Done:",
      employee: "As Employee",
      freelancer: "As Freelancer",
      prototypes: "As Student"
    },
    pl: {
      projects: "Ukończone Projekty:",
      employee: "Jako Pracownik",
      freelancer: "Jako Freelancer",
      prototypes: "Jako Student"
    },
  };
  return (
    <Container sx={{ mt: 5 }} name="carrierProjectsDone">
      <Typography variant="h6" align="center">
        {t[locale]?.projects}
      </Typography>
      <Stack mt={3} direction="row" justifyContent="center" sx={{ flexWrap: 'wrap', gap: 4 }}>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" size={70} value={progress} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" component="div" color="text.secondary">
                {empProjects}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t[locale]?.employee}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" size={70} value={progress} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" component="div" color="text.secondary">
                {freProjects}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t[locale]?.freelancer}
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" size={70} value={progress} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" component="div" color="text.secondary">
                {protProjects}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t[locale]?.prototypes}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};
