import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import { Project, Locale } from "@/interfaces/projects";
import { useRouter } from "next/router";
// Icons:
import {
  TbBrandNextjs,
  TbBrandRedux,
  TbBrandBootstrap,
  TbBrandCss3,
  TbBrandHtml5,
  TbBrandTypescript,
  TbBrandMongodb,
  TbBrandFirebase,
  TbBrandPhp,
} from "react-icons/tb";
import { FaNodeJs, FaReact, FaStripe, FaRaspberryPi, FaSass } from "react-icons/fa";
import { MdOutlineJavascript } from "react-icons/md";
import { SiMysql } from "react-icons/si";
//Define Types

type Props = {
  project: Project;
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
  techIcon: {
    width: 14,
    height: 14,
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

  const getIcon = (tech: string): JSX.Element | null => {
    switch (tech) {
      case "React":
        return <FaReact style={styles.techIcon} />;
      case "Next.js":
        return <TbBrandNextjs style={styles.techIcon} />;
      case "Node.js":
        return <FaNodeJs style={styles.techIcon} />;
      case "Redux":
        return <TbBrandRedux style={styles.techIcon} />;
      case "Bootstrap":
        return <TbBrandBootstrap style={styles.techIcon} />;
      case "Sass":
        return <FaSass style={styles.techIcon} />;
      case "Css":
        return <TbBrandCss3 style={styles.techIcon} />;
      case "Html":
        return <TbBrandHtml5 style={styles.techIcon} />;
      case "vanillaJS":
        return <MdOutlineJavascript style={styles.techIcon} />;
      case "TypeScript":
        return <TbBrandTypescript style={styles.techIcon} />;
      case "Php":
        return <TbBrandPhp style={styles.techIcon} />;
      case "MySql":
        return <SiMysql style={styles.techIcon} />;
      case "MongoDB":
        return <TbBrandMongodb style={styles.techIcon} />;
      case "Firebase":
        return <TbBrandFirebase style={styles.techIcon} />;
      case "Stripe":
        return <FaStripe style={styles.techIcon} />;
      case "Raspberry":
        return <FaRaspberryPi style={styles.techIcon} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, minHeight: "320px" }} className="pointer zoom">
        {loading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={150} style={{borderRadius: 4}} />
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
              {project.technology.slice(0, 3).map((item, i) => (
                <Badge
                  key={i}
                  badgeContent={
                    <Box sx={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "background.default" }}>
                      {getIcon(item)}
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
    </>
  );
};

export default ProjectPaper;
