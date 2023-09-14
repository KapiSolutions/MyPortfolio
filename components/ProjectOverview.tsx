import React, { useState } from "react";
import { useRouter } from "next/router";
import { Chip, Typography, Stack, Box, useTheme, useMediaQuery, Grid, Button } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LinkIcon from "@mui/icons-material/Link";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { FaCodeBranch } from "react-icons/fa";
import { Locale } from "@/utils/interfaces/main";
import type { Project } from "@/utils/schema/project";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import ImageGallery from "./ImageGallery";

type Props = {
  project: Project;
  prevID?: string;
  nextID?: string;
  previewMode?: boolean;
};

const ProjectOverview = ({ project, prevID, nextID, previewMode = false }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const [show, setShow] = useState(-1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      shortDesc: "Short overview",
      as: "As",
      technology: "Technology",
      prev: "Prev",
      next: "Next",
    },
    pl: {
      shortDesc: "Zarys projektu",
      as: "Jako",
      technology: "Technologia",
      prev: "Poprzedni",
      next: "Następny",
    },
    default: {},
  };

  const convertTitle = (title: string) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    if (locale === "pl" && title in polishTitles) {
      return polishTitles[title];
    } else {
      return capitalizedTitle;
    }
  };

  const polishTitles: { [key: string]: string } = {
    description: "Opis",
    background: "Idea projektu",
    process: "Proces tworzenia",
    features: "Funkcjonalności",
    outcome: "Wynik projektu",
    conclusion: "Podsumowanie",
    clientReview: "Opinia klienta",
  };

  // Grid items on the top of the project overview
  const topSegment = (icon: JSX.Element, title: string, content: string | JSX.Element, array = false): JSX.Element => {
    return (
      <Grid container alignItems="top">
        <Grid item xs={2} sm={3}>
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              opacity: 0.65,
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon} {isMobile ? null : <span style={{ marginLeft: 4 }}>{title}</span>}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={7}>
          {array ? <Box> {content}</Box> : <Typography variant="body2">{content}</Typography>}
        </Grid>
      </Grid>
    );
  };
  // Insert content as Link to the topSegment
  const linkInsert = (url: string) => {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          wordWrap: "break-word",
        }}
      >
        {url}
      </Link>
    );
  };
  // Generate array of technologies used in the project
  const techArray = () => {
    return (
      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1.5}>
        {project.technology.split(" ").map((item, idx) => (
          <Chip label={item} size="small" key={idx} />
        ))}
      </Stack>
    );
  };
  // Generate sub sections like description, features etc...
  const getSection = (key: keyof Project, idx: number) => {
    const property = project[key];
    const propertyValue = property && (property[locale as keyof typeof property] as string);
    const startIndex = Object.keys(project).indexOf("description");
    // Ommit title, main image etc. and start from description, show only these fields which are not empty
    if (typeof property === "object" && locale in property && propertyValue && idx >= startIndex) {
      let content;
      // If section includes html objects then parse them
      if (propertyValue?.includes("<")) {
        const tag = propertyValue.includes("<ol>") ? "<ol>" : propertyValue.includes("<ul>") ? "<ul>" : "<ol>";
        const tmp = DOMPurify.sanitize(propertyValue).replaceAll(
          tag,
          `${tag.slice(0, -1)} style="margin: 12px 0px 12px 26px">`
        );
        content = <Box sx={{ mt: 2, ml: 1 }}>{parse(tmp)}</Box>;
      } else {
        content = (
          <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
            {propertyValue}
          </Typography>
        );
      }
      return (
        <>
          <Typography variant="h5" component="h2">
            {convertTitle(Object.keys(project)[idx])}
          </Typography>
          {/* Paste content of the section */}
          {content}

          {/* Show images if exist */}
          {"images" in property && property.images ? (
            <Box>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2} sx={{ mt: 2, ml: 1 }}>
                {property.images
                  .replaceAll("\n", " ")
                  .split(" ")
                  .map((url, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        position: "relative",
                        width: isMobile ? "100%" : "250px",
                        height: "200px",
                      }}
                      onClick={() => setShow(idx)}
                      className="pointer zoom"
                    >
                      <Image
                        src={url}
                        fill
                        alt={project.title[locale]}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                    </Box>
                  ))}
              </Stack>
              {!isMobile && <ImageGallery imgSet={property.images.split("\n")} show={show} setShow={setShow} />}
            </Box>
          ) : null}
        </>
      );
    }
  };

  return (
    <Box name="projectOverviewSection">
      <Typography variant="h3" component="h1">
        {project.title[locale]}
      </Typography>

      {/* General Info Section */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {topSegment(<SegmentIcon />, t[locale].shortDesc, project.shortDesc[locale])}
        {topSegment(<WorkOutlineIcon />, t[locale].as, project.as)}
        {project.liveLink ? topSegment(<LinkIcon />, "Live link", linkInsert(project.liveLink)) : null}
        {project.gitHubLink ? topSegment(<GitHubIcon />, "GitHub", linkInsert(project.gitHubLink)) : null}
        {project.youtubeLink ? topSegment(<YouTubeIcon />, "YouTube", linkInsert(project.youtubeLink)) : null}
        {project.technology ? topSegment(<TuneIcon />, t[locale].technology, techArray(), true) : null}
      </Stack>
      <Box sx={{ position: "relative", width: "100%", height: "300px", mt: 3 }}>
        <Image src={project.image} fill alt={project.title[locale]} style={{ objectFit: "cover" }} />
      </Box>
      {/* Sub sections */}
      {Object.keys(project).map((key, idx) => (
        <Box key={idx} sx={{ mt: 2 }}>
          {getSection(key as keyof Project, idx)}
        </Box>
      ))}

      {/* Nav buttons */}
      {!previewMode && (
        <Stack
          direction="row"
          component="nav"
          spacing={isMobile ? 1 : 6}
          mt={6}
          alignItems="center"
          justifyContent={isMobile ? "space-evenly" : "center"}
        >
          <Link
            href={{
              pathname: "/projects/[pid]",
              query: { pid: prevID },
              hash: "main",
            }}
            passHref
          >
            <Button variant="contained" startIcon={<KeyboardDoubleArrowLeftIcon />}>
              {t[locale].prev}
            </Button>
          </Link>
          {/* <FaCodeBranch style={{ fontSize: 32 }} /> */}
          <Link
            href={{
              pathname: "/projects/[pid]",
              query: { pid: nextID },
              hash: "main",
            }}
            passHref
          >
            <Button variant="contained" endIcon={<KeyboardDoubleArrowRightIcon />}>
              {t[locale].next}
            </Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default ProjectOverview;
