import React, { useState } from "react";
import { Box, Skeleton, Chip, Badge, Typography, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import getIcon from "@/utils/getIcon";
import type { Project } from "@/utils/schema/project";
import type { Locale } from "@/utils/i18n";

type Props = {
  project: Project | null;
};

const ProjectPaper = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  if (!project) {
    return <></>;
  }

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, borderRadius: 2, height: "310px", overflow: "hidden" }}
      className={isMobile ? "" : "pointer zoom"}
      onClick={() => {
        router.push({
          pathname: "/projects/[pid]",
          query: { pid: project._id },
          hash: "main",
        });
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
          style={{ objectFit: "cover", borderRadius: 4, opacity: loading ? 0 : 1 }}
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 33vw"
        />
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {project.title[locale]}
      </Typography>

      <Typography variant="body2" sx={styles.description} component="div">
        {project.shortDesc[locale]}
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
  );
};

const styles = {
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
};

export default ProjectPaper;
