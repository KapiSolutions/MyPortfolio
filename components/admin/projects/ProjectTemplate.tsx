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
import configTemplate from "@/utils/schema/project";
import type { Project } from "@/interfaces/projects";
import type { Locale } from "@/interfaces/main";
import type { Init } from "@/utils/schema/project";
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
  } = useForm<Init>({
    resolver: yupResolver(schema),
    defaultValues: initValues,
  });

  const t = {
    en: {
      submitButton: "Add project!",
    },
    pl: {
      submitButton: "Dodaj projekt!",
    },
    default: {},
  };

  //   Scroll and set focus to the error field
  useEffect(() => {
    const errArray = Object.keys(errors);
    if (errArray.length > 0) {
      console.log(errArray);
      //@ts-ignore
      if (Boolean(errors[errArray[0] as keyof Init].message)) {
        document.getElementsByName(errArray[0])[0].focus();
        document.getElementsByName(errArray[0])[0].scrollIntoView({ block: "center", inline: "nearest" });
      } else {
        //@ts-ignore
        const nestedErrArr = Object.keys(errors[errArray[0] as keyof Init]);
        document.getElementsByName(`${errArray[0]}.${nestedErrArr[0]}`)[0].focus();
        document
          .getElementsByName(`${errArray[0]}.${nestedErrArr[0]}`)[0]
          .scrollIntoView({ block: "center", inline: "nearest" });
      }
      console.log();
      // document.getElementsByName(errArray[0])[0].focus();
      // document.getElementsByName(errArray[0])[0].scrollIntoView({ block: "center", inline: "nearest" });
    }
  }, [errors]);

  // Show snackbar on success and error
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
  const translate = async (key: keyof Init, value: string, setValue: (name: keyof Init, value: any) => void) => {
    const targetLang = locale === "en" ? "pl" : "en";
    const targetKey = `${key}.${targetLang}` as keyof Init;
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

  // Handle submit event
  const onSubmit: SubmitHandler<Init> = async (data) => {
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
      showSnackBar("success", "Project added successfully!");
      //   reset(); //clear fields
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" justifyContent="center" sx={{ mt: 2 }}>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack justifyContent="center" sx={{ flexWrap: "wrap" }}>
            {Object.keys(initValues).map((key, idx) => (
              <Box key={idx}>
                {/* Single textfield */}
                {typeof initValues[key as keyof Init] === "string" ? (
                  <Controller
                    name={key as keyof Init}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        name={key as keyof Init}
                        helperText={Boolean(errors[key as keyof Init]) ? errors[key as keyof Init]?.message : undefined}
                        error={Boolean(errors[key as keyof Init])}
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
                {typeof initValues[key as keyof Init] === "number" ? (
                  <Controller
                    name={key as keyof Init}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        helperText={"Default: 0 . You can change it after."}
                        error={Boolean(errors[key as keyof Init])}
                        onChange={onChange}
                        value={value || ""}
                        label={key}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        disabled
                      />
                    )}
                  />
                ) : null}

                {/* Single boolean switch */}
                {typeof initValues[key as keyof Init] === "boolean" ? (
                  <Controller
                    name={key as keyof Init}
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
                {typeof initValues[key as keyof Init] === "object" ? (
                  <Box>
                    {showDivider(key)}
                    {Object.keys(initValues[key as keyof Init]).map((nestedKey, idx) => (
                      <Controller
                        key={nestedKey}
                        //@ts-ignore
                        name={`${key}.${nestedKey}`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Box sx={{ position: "relative" }}>
                            <TextField
                              name={`${key}.${nestedKey}`}
                              //@ts-ignore
                              helperText={errors[key as keyof Init]?.[nestedKey as keyof Init]?.message ?? undefined}
                              //@ts-ignore
                              error={Boolean(errors[key as keyof Init]?.[nestedKey as keyof Init])}
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
                                onClick={() => translate(key as keyof Init, value as string, setValue)}
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

                {/* {typeof initValues[key as keyof Init] === "file" ? (
                  <Controller
                    name={key as keyof Init}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MuiFileInput
                        fullWidth
                        label={key}
                        margin="dense"
                        onChange={(e) => {
                          console.log("e: ", e);
                          setValue(key as keyof Init, e);
                        }}
                        multiple
                        value={(value as File[]) || undefined}
                        error={Boolean(errors[key as keyof Init])}
                        helperText={Boolean(errors[key as keyof Init]) ? errors[key as keyof Init]?.message : undefined}
                      />
                    )}
                  />
                ) : null} */}
              </Box>
            ))}
          </Stack>
          <Box my={2}>
            {/* Submit button */}
            <Button color="primary" disabled={loading} fullWidth size="large" type="submit" variant="contained">
              {loading ? <CircularProgress size={26} /> : t[locale].submitButton}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default ProjectTemplate;
