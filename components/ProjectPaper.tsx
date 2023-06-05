import React, { useState } from "react";
import {
  Box,
  Skeleton,
  Backdrop,
  Chip,
  Badge,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import getIcon from "@/utils/getIcon";
//Define Types
import type { Project } from "@/schema/project";
import type { Locale } from "@/interfaces/main";
type Props = {
  project: Project | null;
};

//Styles
const styles = {
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
};

const ProjectPaper = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  if (!project) {
    return <></>;
  }

  return (
    <>
      <Paper
        elevation={1}
        sx={{ p: 2, borderRadius: 2, height: "310px", overflow: "hidden" }}
        className={isMobile ? "" : "pointer zoom"}
        onClick={() => {
          if (!redirecting) {
            router.push({
              pathname: "/projects/[pid]",
              query: { pid: project._id },
              hash: "main",
            });
          }
          setRedirecting(true);
        }}
      >
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height={150} style={{ borderRadius: 4 }} />
            <Skeleton variant="text" width="50%" height={34} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
            <Skeleton variant="text" height={24} sx={{ mt: 1 }} />
          </Box>
        ) : null}
        <Box sx={{ position: "relative", width: "100%", height: 150 }}>
          <Image
            onLoadingComplete={() => setLoading(false)}
            src={project.image}
            alt={project.title[locale]}
            fill
            style={{ objectFit: "cover", borderRadius: 4 }}
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 33vw"
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {project.title[locale]}
        </Typography>

        <Typography variant="body2" sx={styles.description} component="div">
          {project.description[locale]}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {project.technology
            .split(" ")
            .slice(0, 3)
            .map((item, i) => (
              <Badge
                key={i}
                badgeContent={
                  <Box sx={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "background.default" }}>
                    {getIcon(item.toLowerCase())}
                  </Box>
                }
                // overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Chip label={item} size="small" />
              </Badge>
            ))}
        </Stack>
      </Paper>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={redirecting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ProjectPaper;
