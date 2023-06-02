import React, { useCallback, useState } from "react";
import axios from "axios";
import { useSnackbar, VariantType } from "notistack";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import type { Project } from "@/schema/project";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";
import CloseIcon from "@mui/icons-material/Close";

//Define Types
type Props = {
  project: Project;
};

const ProjectItem = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, seLoading] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // Show snackbar on success or error
  const showSnackBar = useCallback(
    (variant: VariantType, message: string) => {
      enqueueSnackbar(message, {
        variant: variant,
        action: (key) => (
          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </Button>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
  const deleteItem = async () => {
    seLoading(true);
    setOpenDialog(false);
    try {
      // showSnackBar("default", "Deleting...");
      await axios.delete(`/api/db/delete-by-id/?dbName=Data&collectionName=projects&id=${project._id}`);
      showSnackBar("success", "Project deleted successfully!");
      const revalidateData = {
        paths: ["/", `/projects/${project._id}`],
      };
      await axios.post("/api/revalidate/", revalidateData);
      showSnackBar("success", "Successful revalidation!");
      router.reload();
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", "Something went wrong!");
    } finally {
      seLoading(false);
    }
  };

  const t = {
    en: {
      showMore: "Show more",
      hide: "Hide",
      deleteButton: "Delete",
      editButton: "Edit",
    },
    pl: {
      showMore: "Więcej",
      hide: "Zwiń",
      deleteButton: "Usuń",
      editButton: "Edytuj",
    },
    default: {},
  };
  return (
    <>
      <Stack direction="column" spacing={3}>
        <Grid container spacing={2} wrap="nowrap" direction="row" justifyContent="center">
          <Grid item xs={9} sm={5} lg={9}>
            <Typography variant="body1">{project.title[locale]}</Typography>
          </Grid>

          {isMobile ? null : (
            <Grid item sm={3} lg={1}>
              <Typography variant="body1">{project.date}</Typography>
            </Grid>
          )}

          <Grid item xs={3} sm={4} lg={2}>
            <Stack direction="row" spacing={3}>
              {isMobile ? null : (
                <Button variant="outlined" size="small" color="error" onClick={handleOpen}>
                  {t[locale].deleteButton}
                </Button>
              )}

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  router.push({
                    pathname: "/admin/projects/[pid]",
                    query: { pid: project._id },
                    hash: "main",
                  });
                  // setLoadingEdit(true);
                }}
              >
                {t[locale].editButton}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" flexItem />
      </Stack>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete the document?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={deleteItem} variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ProjectItem;
