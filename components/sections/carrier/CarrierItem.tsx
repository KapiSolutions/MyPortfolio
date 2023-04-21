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
import { Typography } from "@mui/material";
import { Job } from "@/interfaces/carrier";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  item: Job;
  locale: Locale;
};
export const CarrierItem = ({ item, locale }: Props): JSX.Element => {
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
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
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
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
        {item.dateEnd ? `${item.dateStart} - ${item.dateEnd}` : `${item.dateStart} -`}
      </TimelineOppositeContent>
      {getSeparator(item.type)}
      <TimelineContent sx={{ py: "12px" }}>
        <Typography variant="h6" component="span">
          {item.companyName}
        </Typography>
        <Typography variant="caption" component="p">
          {item.as[locale]}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
