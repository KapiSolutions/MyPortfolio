import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Skeleton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProjectPaper from "./ProjectPaper";
import { Projects } from '@/interfaces/projects'

//Define Types
type Props ={
  projects: Projects;
}

const ProjectsSection = ({projects}: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box>
      <Typography variant="h3" sx={{mb: 2}}>
        <Typography variant="h4" component="span" color="text.disabled">
          my
        </Typography>
        Works
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          // Render Skeleton components for loading state
          <>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={150} />
                  <Skeleton variant="text" height={32} sx={{ mt: 2 }} />
                  <Skeleton variant="text" height={16} sx={{ mt: 1 }} />
                  <Skeleton variant="text" height={16} sx={{ mt: 1 }} />
                </Paper>
              </Grid>
            ))}
          </>
        ) : (
          // Render actual project cards when data is loaded
          <>
            {/* <Carousel sx={{ width: "100%" }}> */}
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProjectPaper project={project}/>
              </Grid>
            ))}
            {/* </Carousel> */}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProjectsSection;
