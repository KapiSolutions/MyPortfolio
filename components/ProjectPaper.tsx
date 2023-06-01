import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { Box, Skeleton } from "@mui/material";
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

  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!project) {
    return <></>;
  }

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, borderRadius: 2, minHeight: "320px" }}
      className="pointer zoom"
      onClick={() => {
        router.push({
          pathname: "/projects/[pid]",
          query: { pid: project._id },
          // query: { pid: project.title.en.replaceAll(" ", "-"), id: project._id },
          hash: "main",
        });
        // setLoadingEdit(true);
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height={150} style={{ borderRadius: 4 }} />
          <Skeleton variant="text" width="50%" height={34} sx={{ mt: 2 }} />
          <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
          <Skeleton variant="text" height={24} sx={{ mt: 1 }} />
        </>
      ) : (
        <>
          <Box sx={{ position: "relative", width: "100%", height: 150 }}>
            <Image
              src={project.image}
              alt={project.title[locale]}
              fill
              style={{ objectFit: "cover", borderRadius: 4 }}
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
        </>
      )}
    </Paper>
  );
};

export default ProjectPaper;
