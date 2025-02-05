import React, { useState } from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import EjectIcon from "@mui/icons-material/Eject";
import FactoryIcon from "@mui/icons-material/Factory";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  List,
  ListItem,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import type { Job, Locale } from "@/utils/interfaces/carrier";
import Link from "next/link";
import { getTranslation, type Tkey } from "@/utils/i18n";

type Props = {
  item: Job;
  locale: Locale;
  isMobile: boolean;
};
export const CarrierItem = ({ item, locale, isMobile }: Props): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);
  const t = (key: Tkey) => getTranslation(locale, key);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getDotItem = (type: string) => {
    switch (type) {
      case "freelancer":
        return (
          <TimelineDot color="primary" variant="outlined">
            <DoneAllIcon />
          </TimelineDot>
        );
      case "job":
        return (
          <TimelineDot color="primary">
            <WorkIcon />
          </TimelineDot>
        );
      case "practice":
        return (
          <TimelineDot color="secondary">
            <FactoryIcon />
          </TimelineDot>
        );
      case "study":
        return (
          <TimelineDot color="warning">
            <SchoolIcon />
          </TimelineDot>
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
    if (end) {
      if (start.localeCompare(end) === 0) {
        return start;
      } else {
        return `${start} - ${end}`;
      }
    } else {
      return `${start} - ${t("carrier.item.now")}`;
    }
  };
  return (
    <>
      <TimelineItem className="pointer zoom" onClick={handleOpen}>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
          {timePeriod(item.dateStart, item.dateEnd)}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          {getDotItem(item.type)}
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px" }}>
          <Typography variant="h6" component="span">
            {item.companyName[locale]}
          </Typography>
          <Typography variant="caption" component="p">
            {item.as[locale]}
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Details of the job item */}
      <Dialog open={openDialog} onClose={handleClose} fullScreen={isMobile}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* DIALOG HEADER */}
          <Box sx={{ mb: 2 }}>
            <DialogTitle sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 0, pb: 0 }}>
              {item.companyName[locale]}
            </DialogTitle>
            {item.companyName[locale] === "KapiSolutions" && (
              <Typography variant="button" sx={{ ml: 4, fontWeight: "bold" }}>
                ~ Jakub Kapturkiewicz
              </Typography>
            )}
          </Box>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" sx={{ mr: 1 }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* DIALOG CONTENT */}
        <DialogContent dividers>
          {/* Job position */}
          <Typography variant="button" sx={{ mb: 2, fontWeight: "bold" }} component="p">
            {item.type === "study" ? t("carrier.item.study-field") : t("carrier.item.job-position")}
          </Typography>
          <DialogContentText sx={{ mb: 2 }}>{item.as[locale]}</DialogContentText>

          {/* Finished Projects */}
          <Typography variant="button" sx={{ mb: 2, fontWeight: "bold" }} component="p">
            {t("carrier.item.finished-projects")} {item.projectsDone}
          </Typography>

          {/* Responsibilities */}
          {item.jobDescription[locale] ? (
            <>
              <Typography variant="button" component="p">
                {t("carrier.item.job-desc")}
              </Typography>
              <DialogContentText component="span">{item.jobDescription[locale]}</DialogContentText>
            </>
          ) : (
            <>
              <Typography variant="button" component="p" sx={{ fontWeight: "bold" }}>
                {t("carrier.item.responsibilities")}
              </Typography>
              <DialogContentText component="span">
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                  {item.responsibilities[locale]?.length > 0 &&
                    item.responsibilities[locale].map((res, idx) => (
                      <ListItem key={idx} sx={{ display: "list-item" }}>
                        {res}
                      </ListItem>
                    ))}
                </List>
              </DialogContentText>
            </>
          )}
          {/* Links section */}
          {item.links.length > 0 && (
            <>
              <Typography variant="button" component="p" sx={{ fontWeight: "bold" }}>
                {t("carrier.item.links")}
              </Typography>
              <DialogContentText component="span">
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                  {item.links.map((url, idx) => (
                    <ListItem key={idx} sx={{ display: "list-item" }}>
                      <Link target="_blank" rel="noopener noreferrer" href={url}>
                        {url}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            {t("carrier.item.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
