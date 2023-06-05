import * as Yup from "yup";
import type { Locale } from "@/utils/interfaces/main";

const initValues = {
  title: {
    pl: "",
    en: "",
  },
  image: "",
  shortDesc: {
    pl: "",
    en: "",
  },
  description: {
    pl: "",
    en: "",
  },
  background: {
    pl: "",
    en: "",
    images: "",
  },
  process: {
    pl: "",
    en: "",
    images: "",
  },
  features: {
    pl: "",
    en: "",
    images: "",
  },
  outcome: {
    pl: "",
    en: "",
    images: "",
  },
  conclusion: {
    pl: "",
    en: "",
    images: "",
  },
  clientReview: {
    pl: "",
    en: "",
    name: "",
  },
  technology: "",
  liveLink: "",
  gitHubLink: "",
  youtubeLink: "",
  as: "KapiSolutions - Jakub Kapturkiewicz",
  date: new Date().toLocaleDateString(),
};

const project = (locale: Locale) => {
  const maxLength = 1000;
  const errorMsg = locale === "en" || "default" ? "Field required" : "Pole wymagane";
  const optionalString = Yup.string().max(maxLength, `Max ${maxLength} characters!`);
  const requiredString = Yup.string().max(maxLength, `Max ${maxLength} characters!`).required(errorMsg);
  const objectReq = Yup.object().shape({pl:requiredString, en: requiredString})
  const objectWithImg = Yup.object().shape({pl:optionalString, en: optionalString, image: optionalString})
  
  const schema = Yup.object().shape({
    title: objectReq,
    image: requiredString,
    shortDesc: objectReq,
    description: objectReq,
    background: objectWithImg,
    process: objectWithImg,
    features: objectWithImg,
    outcome: objectWithImg,
    conclusion: objectWithImg,
    clientReview: Yup.object().shape({en:optionalString, pl: optionalString, name: optionalString}),
    technology: optionalString,
    liveLink: optionalString,
    gitHubLink: optionalString,
    youtubeLink: optionalString,
    as: optionalString,
    date: requiredString,
  });

  return { schema, initValues };
};

export type Project = typeof initValues & {_id?: string};
export interface Projects extends Array<Project> {}
export default project;
