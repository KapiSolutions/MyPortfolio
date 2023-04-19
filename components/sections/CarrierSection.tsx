import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, useTheme, useMediaQuery } from "@mui/material";
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
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import RepeatIcon from "@mui/icons-material/Repeat";

const CarrierSection = (): JSX.Element => {
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
    <Container sx={{p: isMobile ? 0 : 2}} name="carrierSection">
      <Typography variant="h2" sx={{m:isMobile ? 2 : 0}}>{t[locale]?.h}</Typography>
      <Timeline position="alternate" sx={{ p: 0 }}>
        <TimelineItem sx={{ m: "auto" }}>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
            2020 -
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          {/* , maxWidth: isMobile ? "78px" : "auto"  */}
          <TimelineContent sx={{ py: "12px"}}>
            <Typography variant="h6" component="span">
              KapiSolutions
            </Typography>
            <Typography>Freelancer - FullStack Dev & Mechatronic Systems Engineer</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0"}} variant="body2" color="text.secondary">
            2017 - 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              CSN-Stanel
            </Typography>
            <Typography>Automation systems engineer</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
            2016 - 2017
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              MONIT - SHM
            </Typography>
            <Typography>Automation systems engineer</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
            2014
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px" }}>
            <Typography variant="h6" component="span">
              Synthos S.A
            </Typography>
            <Typography>Practice</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default CarrierSection;
