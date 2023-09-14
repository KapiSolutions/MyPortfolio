import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Box,
  TextField,
  Stack,
  Divider,
  ButtonBase,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch,
  CircularProgress,
  IconButton,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";
import configTemplate from "@/utils/schema/project";
import type { Locale } from "@/utils/interfaces/main";
import type { Project } from "@/utils/schema/project";
import ProjectOverview from "@/components/ProjectOverview";
// import { MuiFileInput } from "mui-file-input";

//Define Types
type Props = {
  project: Project | null;
};

const ProjectTemplate = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const { schema, initValues } = configTemplate(locale);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Project>({
    resolver: yupResolver(schema),
    defaultValues: project ? project : initValues,
  });
  const editMode = project ? true : false;
  const t = {
    en: {
      submitButton: "Add project!",
      submitEditButton: "Update project!",
      previewShowButton: "Show preview",
      previewCloseButton: "Close preview",
    },
    pl: {
      submitButton: "Dodaj projekt!",
      submitEditButton: "Zaktualizuj projekt!",
      previewShowButton: "Podgląd projektu",
      previewCloseButton: "Zamknij podgląd",
    },
    default: {},
  };

  // Scroll and set focus on the error field
  useEffect(() => {
    const errArray = Object.keys(errors);
    // check for errors
    if (errArray.length > 0) {
      setShowPreview(false);
      const key = errArray[0] as keyof Project;
      const property = errors[key];

      if (typeof property === "object" && "message" in property) {
        // single field
        document.getElementsByName(errArray[0])[0].focus();
        document.getElementsByName(errArray[0])[0].scrollIntoView({ block: "center", inline: "nearest" });
      } else if (typeof property === "object" && !("message" in property)) {
        // Nested object fields
        const nestedErrArr = Object.keys(property);
        document.getElementsByName(`${key}.${nestedErrArr[0]}`)[0].focus();
        document
          .getElementsByName(`${key}.${nestedErrArr[0]}`)[0]
          .scrollIntoView({ block: "center", inline: "nearest" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // Close preview on evry change of input form
  useEffect(() => {
    watch(() => setShowPreview(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

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

  // Translate fields
  const translate = async (key: keyof Project, value: string, setValue: (name: keyof Project, value: any) => void) => {
    const targetLang = locale === "en" ? "pl" : "en";
    const targetKey = `${key}.${targetLang}` as keyof Project;
    let translatedTxt = "";
    if (value) {
      try {
        const res = await axios.get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${locale}&tl=${targetLang}&dt=t&q=${encodeURI(
            value
          )}`
        );
        res.data[0].map((text: string) => {
          translatedTxt += text[0];
        });
        setValue(targetKey, translatedTxt);
        clearErrors(targetKey);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Show divider to separate input field sections
  const showDivider = (nextKey?: string | undefined) => {
    // const divider = <Divider orientation="horizontal" flexItem sx={{ m: 2 }} />;
    const name = nextKey;
    const divider = (
      <Divider sx={{ m: 2 }}>
        <Button size="large" disabled>
          {name}
        </Button>
      </Divider>
    );
    return divider;
  };

  // Handle submit
  //   const submitForm: SubmitHandler<Project> = async (data) => {
  const submitForm = async () => {
    setLoading(true);
    //data - contains only fields with entered values
    //getValues - get all fields
    const allData = getValues();

    try {
      let status = 0;
      let docId;
      if (editMode) {
        // update existing project
        const res = await axios.put("/api/db/projects/update/", { updates: allData });
        status = res.status;
        docId = allData._id;
      } else {
        // add new project
        const res = await axios.post("/api/db/projects/new/", { newProject: allData });
        status = res.status;
        docId = res.data.insertedId;
      }
      if (status === 204) {
        // no changes to made
        setShowPreview(false);
        showSnackBar("warning", "There is no changes to made.");
      } else if (status === 200) {
        // request was successful
        await revalidatePaths(docId);
        setShowPreview(false);
        reset(); //clear fields
        showSnackBar("success", `Project ${editMode ? "updated" : "added"} successfully!`);
        router.push("/admin/projects#main");
      }
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", errors.message);
    } finally {
      setLoading(false);
    }
  };
  const scrollDown = () => {
    document.getElementsByName("showPreviewProjectButton")[0].scrollIntoView({ block: "start", inline: "nearest" });
  };

  const revalidatePaths = async (id: string) => {
    const revalidateData = {
      paths: ["/", `/projects/${id}`],
    };
    try {
      await axios.post("/api/revalidate/", revalidateData);
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("warning", "Revalidation Error");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      sx={{ mt: 2, margin: "auto" }}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(() => setShowPreview(!showPreview))}>
        <Stack justifyContent="center" sx={{ flexWrap: "wrap" }}>
          {Object.keys(initValues).map((key, idx) => (
            <Box key={idx}>
              {/* Single textfield */}
              {typeof initValues[key as keyof typeof initValues] === "string" ? (
                <Controller
                  name={key as keyof Project}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name={key as keyof Project}
                      helperText={
                        Boolean(errors[key as keyof Project]) ? errors[key as keyof Project]?.message : undefined
                      }
                      error={Boolean(errors[key as keyof Project])}
                      onChange={onChange}
                      value={value || ""}
                      label={key}
                      variant="outlined"
                      margin="normal"
                      size={key.includes("Link") ? "small" : "medium"}
                      disabled={loading}
                      multiline
                      fullWidth
                    />
                  )}
                />
              ) : null}

              {/* Single number input */}
              {typeof initValues[key as keyof typeof initValues] === "number" ? (
                <Controller
                  name={key as keyof Project}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name={key as keyof Project}
                      helperText={
                        Boolean(errors[key as keyof Project]) ? errors[key as keyof Project]?.message : undefined
                      }
                      error={Boolean(errors[key as keyof Project])}
                      onChange={onChange}
                      value={value || ""}
                      label={key}
                      variant="outlined"
                      margin="normal"
                      type="number"
                      fullWidth
                    />
                  )}
                />
              ) : null}

              {/* Single boolean switch */}
              {typeof initValues[key as keyof typeof initValues] === "boolean" ? (
                <Controller
                  name={key as keyof Project}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      onChange={onChange}
                      value={value}
                      control={<Switch color="primary" />}
                      label={key}
                      labelPlacement="start"
                    />
                  )}
                />
              ) : null}

              {/* Nested Objects */}
              {typeof initValues[key as keyof typeof initValues] === "object" ? (
                <Box>
                  {showDivider(key)}
                  {Object.keys(initValues[key as keyof typeof initValues]).map((nestedKey, idx) => (
                    <Controller
                      key={nestedKey}
                      //@ts-ignore
                      name={`${key}.${nestedKey}`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Box sx={{ position: "relative" }}>
                          <TextField
                            name={`${key}.${nestedKey}`}
                            helperText={
                              //@ts-ignore
                              errors[key as keyof Project]?.[nestedKey as "pl" | "en" | "images"]?.message ?? undefined
                            }
                            //@ts-ignore
                            error={Boolean(errors[key as keyof Project]?.[nestedKey as "pl" | "en" | "images"])}
                            onChange={onChange}
                            value={value || ""}
                            label={key + nestedKey.toUpperCase()}
                            variant="outlined"
                            margin="normal"
                            disabled={loading}
                            multiline
                            fullWidth
                          />
                          {/* Translate Button */}
                          {nestedKey === locale ? (
                            <ButtonBase
                              sx={{ position: "absolute", mt: "15px", ml: "-40px", p: 1, pt: 2 }}
                              onClick={() => translate(key as keyof Project, value as string, setValue)}
                            >
                              <TranslateIcon />
                            </ButtonBase>
                          ) : null}
                        </Box>
                      )}
                    />
                  ))}
                </Box>
              ) : null}

              {/* File Input */}
              {/* {typeof initValues[key as keyof Project] === "file" ? (
                  <Controller
                    name={key as keyof Project}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MuiFileInput
                        fullWidth
                        label={key}
                        margin="dense"
                        onChange={(e) => {
                          console.log("e: ", e);
                          setValue(key as keyof Project, e);
                        }}
                        multiple
                        value={(value as File[]) || undefined}
                        error={Boolean(errors[key as keyof Project])}
                        helperText={Boolean(errors[key as keyof Project]) ? errors[key as keyof Project]?.message : undefined}
                      />
                    )}
                  />
                ) : null} */}
            </Box>
          ))}
        </Stack>
        {/* Preview button */}
        <Button
          name="showPreviewProjectButton"
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 2, mb: 4 }}
          type="submit"
        >
          {showPreview ? t[locale].previewCloseButton : t[locale].previewShowButton}
        </Button>

        {showPreview ? (
          <>
            <ProjectOverview project={getValues()} previewMode={true} />
            {/* Submit button */}
            <Button
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
              onClick={submitForm}
              variant="contained"
              sx={{ mt: 4 }}
            >
              {loading ? (
                <CircularProgress size={26} />
              ) : editMode ? (
                t[locale].submitEditButton
              ) : (
                t[locale].submitButton
              )}
            </Button>
          </>
        ) : (
          <Box sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: 1 }}>
            <Button color="primary" variant="contained" onClick={scrollDown} sx={{ borderRadius: "50%", py: 1, px: 0 }}>
              <KeyboardArrowDownIcon sx={{ fontSize: 48 }} />
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default ProjectTemplate;
