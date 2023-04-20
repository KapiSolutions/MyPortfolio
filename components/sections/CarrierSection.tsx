import React, { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { Container, Typography, useTheme, useMediaQuery, Box, CircularProgress, Stack } from "@mui/material";
import { Locale } from "@/interfaces/main";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const CarrierSection = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const progressBar = async () => {
    if (progress == 0) {
      for (let i = 0; i <= 100; i++) {
        await sleep(10);
        setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
        console.log(progress);
      }
    }
  };

  useLayoutEffect(() => {
    return () => {
      progressBar();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      h: "Carrier",
    },
    pl: {
      h: "Kariera",
    },
  };
  return (
    <Box sx={{ width: "100%" }} name="carrierSection">
      <Container>
        <Typography variant="h2" sx={{ m: isMobile ? 2 : 0 }}>
          {t[locale]?.h}
        </Typography>
      </Container>
      <Timeline position="alternate" sx={{ p: 0 }}>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
            2020 -
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <DoneAllIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              KapiSolutions
            </Typography>
            <Typography variant="caption" component="p">
              Freelancer - FullStack Dev & Mechatronic Systems Engineer
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
            2017 - 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              CSN-Stanel
            </Typography>
            <Typography variant="caption" component="p">
              Automation systems engineer
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
            2016 - 2017
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              Monit - Shm
            </Typography>
            <Typography variant="caption" component="p">
              Automation systems engineer
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
            2016
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              Monit - Shm
            </Typography>
            <Typography>Practice</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
            2014
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              Synthos S.A
            </Typography>
            <Typography>Practice</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      {/* Progress Bars */}
      {/* direction={isMobile ? "column" : "row"} */}
      <Container sx={{ mt: 5 }} name="carrierProjectsDone">
        <Typography variant="h6" align="center">
          Projects Done:
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
              As Employee
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
              As Freelancer
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CarrierSection;
