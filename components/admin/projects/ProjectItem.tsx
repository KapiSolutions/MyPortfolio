import React, { useState } from "react";
import { Button, Box, Grid, Stack, Typography, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Project } from "@/interfaces/projects";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";

//Define Types
type Props = {
  project: Project;
};

const ProjectItem = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [howMany, setHowMany] = useState(false);

  const t = {
    en: {
      showMore: "Show more",
      hide: "Hide",
    },
    pl: {
      showMore: "Więcej",
      hide: "Zwiń",
    },
    default: {},
  };
  return (
    <Stack direction="column" spacing={3}>
    <Grid container spacing={2} wrap="nowrap" direction="row" justifyContent="center">
      <Grid item xs={9} sm={5} lg={9}>
        <Typography variant="body1">{project.title[locale]}</Typography>
      </Grid>

      {isMobile ? null : (
        <Grid item sm={3} lg={1}>
          <Typography variant="body1">Number</Typography>
        </Grid>
      )}

      <Grid item xs={3} sm={4} lg={2}>
        <Stack direction="row" spacing={3} >
          {isMobile ? null : (
            <Button variant="outlined" size="small" color="error">
              Delete
            </Button>
          )}

          <Button variant="contained" size="small" >
            Edit
          </Button>
        </Stack>
      </Grid>
    </Grid>
    <Divider orientation="horizontal" flexItem />
    </Stack>
  );
};

export default ProjectItem;
