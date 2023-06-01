import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Box,
  TextField,
  Stack,
  Typography,
  Divider,
  ButtonBase,
  Container,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";
import configTemplate from "@/schema/project";
import type { Locale } from "@/interfaces/main";
import type { Project } from "@/schema/project";
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
    defaultValues: initValues,
  });

  const t = {
    en: {
      submitButton: "Add project!",
      previewShowButton: "Show preview",
      previewCloseButton: "Close preview",
    },
    pl: {
      submitButton: "Dodaj projekt!",
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
    const payload = {
      newProject: allData,
    };

    try {
      const res = await axios.post("/api/db/projects/new/", payload);
      // On success:
      setShowPreview(false);
      reset(); //clear fields
      showSnackBar("success", "Project added successfully!");
      router.back();
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", "Something went wrong!");
    } finally {
      setLoading(false);
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
              {typeof initValues[key as keyof Project] === "string" ? (
                <Controller
                  name={key as keyof Project}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name={key as keyof Project}
                      helperText={Boolean(errors[key as keyof Project]) ? errors[key as keyof Project]?.message : undefined}
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
              {typeof initValues[key as keyof Project] === "number" ? (
                <Controller
                  name={key as keyof Project}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name={key as keyof Project}
                      helperText={Boolean(errors[key as keyof Project]) ? errors[key as keyof Project]?.message : undefined}
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
              {typeof initValues[key as keyof Project] === "boolean" ? (
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
              {typeof initValues[key as keyof Project] === "object" ? (
                <Box>
                  {showDivider(key)}
                  {Object.keys(initValues[key as keyof Project]).map((nestedKey, idx) => (
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
        <Button color="primary" fullWidth size="large" variant="contained" sx={{ mt: 2, mb: 4 }} type="submit">
          {showPreview ? t[locale].previewCloseButton : t[locale].previewShowButton}
        </Button>

        {showPreview ? (
          <>
            <ProjectOverview project={getValues()} />
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
              {loading ? <CircularProgress size={26} /> : t[locale].submitButton}
            </Button>
          </>
        ) : null}
      </form>
    </Box>
  );
};

export default ProjectTemplate;
