import React from "react";
import {
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
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ArchitectureIcon from '@mui/icons-material/Architecture';
import EjectIcon from '@mui/icons-material/Eject';
import FactoryIcon from '@mui/icons-material/Factory';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Typography } from "@mui/material";
import { Job } from "@/interfaces/carrier";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  item: Job;
  locale: Locale;
};
export const CarrierItem = ({ item, locale }: Props): JSX.Element => {
    const t = {
        en: {
          now: "Now",
        },
        pl: {
          now: "Teraz",
        },
      };
  const getSeparator = (type: string) => {
    switch (type) {
      case "freelancer":
        return (
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <DoneAllIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
        );
      case "job":
        return (
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
        );
      case "practice":
        return (
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              <FactoryIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
        );
        case "study":
        return (
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="warning">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
        );
      default:
        return (
          <TimelineDot color="secondary">
            <AddToQueueIcon />
          </TimelineDot>
        );
    }
  };

  const timePeriod = (start: string, end: string) => {
    // console.log(start, end);
    if (end) {
      if (start.localeCompare(end) === 0) {
        return start;
      } else {
        return `${start} - ${end}`;
      }
    }else
    {
      return `${start} - ${t[locale].now}`;
    }
  };
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
        {timePeriod(item.dateStart, item.dateEnd)}
      </TimelineOppositeContent>
      {getSeparator(item.type)}
      <TimelineContent sx={{ py: "12px" }}>
        <Typography variant="h6" component="span">
          {item.companyName[locale]}
        </Typography>
        <Typography variant="caption" component="p">
          {item.as[locale]}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
