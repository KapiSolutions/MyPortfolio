import React, { useEffect, useState, useReducer, useRef } from "react";
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
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { Project } from "@/interfaces/projects";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";

//Define Types
type Props = {
  project: Project | null;
};
const maxLength = 1000;
type Init = {
  backgroundPL: string;
  backgroundEN: string;
  backgroundImages: File[] | undefined;
};
const initValues: Init = {
  // titlePL: "",
  // titleEN: "",
  // shortDescPL: "",
  // shortDescEN: "",
  // descriptionPL: "",
  // descriptionEN: "",
  backgroundPL: "",
  backgroundEN: "",
  backgroundImages: undefined,
  //   processPL: "",
  //   processEN: "",
  //   processImages: "",
  //   featuresPL: "",
  //   featuresEN: "",
  //   featuresImages: "",
  //   outcomePL: "",
  //   outcomeEN: "",
  //   outcomeImages: "",
  //   conclusionPL: "",
  //   conclusionEN: "",
  //   conclusionImages: "",
  //   clientReviewPL: "",
  //   clientReviewEN: "",
  //   clientReviewName: "",
  //   asFreelancer: false,
  //   technology: "",
  //   liveLink: "",
  //   gitHubLink: "",
  //   youtubeLink: "",
  //   image: "",
};

const validation = Yup.object().shape({
  // titlePL: Yup.string().max(maxLength).required("Title is required"),
  // titleEN: Yup.string().max(maxLength).required("Title is required"),
  // shortDescPL: Yup.string().max(maxLength).required("Title is required"),
  // shortDescEN: Yup.string().max(maxLength).required("Title is required"),
  // descriptionPL: Yup.string().max(maxLength).required("Title is required"),
  // descriptionEN: Yup.string().max(maxLength).required("Title is required"),
  backgroundPL: Yup.string().max(maxLength).required("Title is required"),
  backgroundEN: Yup.string().max(maxLength).required("Title is required"),
  backgroundImages: Yup.mixed().nullable(),
  //   processPL: Yup.string().max(maxLength).required("Title is required"),
  //   processEN: Yup.string().max(maxLength).required("Title is required"),
  //   processImages: Yup.string().max(maxLength).required("Title is required"),
  //   featuresPL: Yup.string().max(maxLength).required("Title is required"),
  //   featuresEN: Yup.string().max(maxLength).required("Title is required"),
  //   featuresImages: Yup.string().max(maxLength).required("Title is required"),
  //   outcomePL: Yup.string().max(maxLength).required("Title is required"),
  //   outcomeEN: Yup.string().max(maxLength).required("Title is required"),
  //   outcomeImages: Yup.string().max(maxLength).required("Title is required"),
  //   conclusionPL: Yup.string().max(maxLength).required("Title is required"),
  //   conclusionEN: Yup.string().max(maxLength).required("Title is required"),
  //   conclusionImages: Yup.string().max(maxLength).required("Title is required"),
  //   clientReviewPL: Yup.string().max(maxLength).required("Title is required"),
  //   clientReviewEN: Yup.string().max(maxLength).required("Title is required"),
  //   clientReviewName: Yup.string().max(maxLength).required("Title is required"),
  //   asFreelancer: Yup.boolean().required("Title is required"),
  //   technology: Yup.string().max(maxLength).required("Title is required"),
  //   liveLink: Yup.string().max(maxLength).required("Title is required"),
  //   gitHubLink: Yup.string().max(maxLength).required("Title is required"),
  //   youtubeLink: Yup.string().max(maxLength).required("Title is required"),
  //   image: Yup.string().max(maxLength).required("Title is required"),
});

const ProjectTemplate = ({ project }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

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
  const handleSubmit = (values: Object, actions: FormikHelpers<typeof initValues>) => {
    console.log(values);

    // On success:
    actions.setSubmitting(false); //anables to send again
    actions.resetForm();
  };

  const getFieldType = (name: string) => {
    if (name.includes("mage")) {
      return "file"; //images
    } else if (name.includes("Link")) {
      return "url";
    } else if (name.includes("Freelancer")) {
      return "checkbox";
    } else {
      return "text";
    }
  };

  const translate = async (key: keyof Init, values: Init, setFieldValue: (field: string, value: any) => void) => {
    const currentLang = locale.toUpperCase();
    const targetLang = locale === "en" ? "PL" : "EN";
    const targetKey = key.replace(currentLang, targetLang);
    const inputKeyValue = String(values[key]);

    let translatedTxt = "";
    if (inputKeyValue != "") {
      try {
        const res = await axios.get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${currentLang}&tl=${targetLang}&dt=t&q=${encodeURI(
            inputKeyValue
          )}`
        );
        res.data[0].map((text: string) => {
          translatedTxt += text[0];
        });
        setFieldValue(targetKey, translatedTxt);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" justifyContent="center" sx={{mt:2}}>
      <Container maxWidth="sm">
        <Formik
          initialValues={initValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              {Object.keys(initValues).map((key, idx) => (
                <Box key={idx}>
                  {getFieldType(key) === "file" ? (
                    <MuiFileInput
                      error={Boolean(touched[key as keyof Init] && errors[key as keyof Init])}
                      fullWidth
                      helperText={touched[key as keyof Init] && errors[key as keyof Init]}
                      label={key}
                      margin="dense"
                      name={key}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue(key, e);
                      }}
                      multiple
                      // @ts-ignore
                      value={values[key as keyof Init]}
                    />
                  ) : (
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        error={Boolean(touched[key as keyof Init] && errors[key as keyof Init])}
                        fullWidth
                        helperText={touched[key as keyof Init] && errors[key as keyof Init]}
                        label={key}
                        margin="dense"
                        name={key}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type={getFieldType(key)}
                        value={values[key as keyof Init]}
                        variant="outlined"
                      />
                      {/* Translate Button */}
                      {key.includes(locale.toUpperCase()) ? (
                        <ButtonBase
                          sx={{ position: "absolute", mt: "15px", ml: "-40px", p: 1, pt: 2 }}
                          onClick={() => translate(key as keyof Init, values, setFieldValue)}
                        >
                          <TranslateIcon />
                        </ButtonBase>
                      ) : null}
                    </Box>
                  )}
                </Box>
              ))}
              <Box my={2}>
                {/* Submit button */}
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Project!
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default ProjectTemplate;
