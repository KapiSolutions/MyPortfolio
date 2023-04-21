import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  locale: Locale;
};

export const ProgressBars = ({ locale }: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
    },
    pl: {
      projects: "Ukończone Projekty:",
      employee: "Jako Pracownik",
      freelancer: "Jako Freelancer",
    },
  };
  return (
    <Container sx={{ mt: 5 }} name="carrierProjectsDone">
      <Typography variant="h6" align="center">
        {t[locale].projects}
      </Typography>
      <Stack mt={3} spacing={5} direction="row" justifyContent="center">
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
              <Typography variant="caption" component="div" color="text.secondary">
                {45}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
          {t[locale].employee}
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
              <Typography variant="caption" component="div" color="text.secondary">
                {9}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
          {t[locale].freelancer}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};
