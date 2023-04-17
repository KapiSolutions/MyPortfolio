import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
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
} from "react-icons/tb";
import { FaNodeJs, FaReact, FaStripe, FaRaspberryPi, FaSass } from "react-icons/fa";
import { MdOutlineJavascript } from "react-icons/md";
//Define Types

type Props = {
  project: Project;
};

//Styles
const styles = {
  description: {
    display: "inline-block",
    maxHeight: "3em",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  techIcon: {
    width: 14,
    height: 14,
  },
};

const ProjectPaper = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;

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
      case "Stripe":
        return <FaStripe style={styles.techIcon} />;
      case "Raspberry":
        return <FaRaspberryPi style={styles.techIcon} />;
      default:
        return null;
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ position: "relative", width: "100%", height: "150px" }}>
        <Image src={project.image} alt={project.title[locale]} fill style={{ objectFit: "cover", borderRadius: 4 }} />
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {project.title[locale]}
      </Typography>

      <Typography variant="body2" sx={styles.description}>
        {project.description[locale]}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {project.technology.map((item, i) => (
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
            <Chip label={item} size="small"/>
          </Badge>
        ))}
      </Stack>
    </Paper>
  );
};

export default ProjectPaper;
