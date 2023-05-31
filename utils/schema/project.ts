import * as Yup from "yup";
import type { Locale } from "@/interfaces/main";

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
  asFreelancer: true,
  technology: "",
  liveLink: "",
  gitHubLink: "",
  youtubeLink: "",
  number: 0,
};

export type Init = typeof initValues;

const project = (locale: Locale) => {
  const maxLength = 1000;
  const errorMsg = locale === "en" || "default" ? "Field required" : "Pole wymagane";
  const optionalString = Yup.string().max(maxLength, `Max ${maxLength} characters!`);
  const requiredString = Yup.string().max(maxLength, `Max ${maxLength} characters!`).required(errorMsg);
  const langObjectReq = Yup.object().shape({pl:requiredString, en: requiredString})
  const langObjectImg = Yup.object().shape({pl:optionalString, en: optionalString, image: optionalString})
  
  const schema = Yup.object().shape({
    title: langObjectReq,
    image: requiredString,
    shortDesc: langObjectReq,
    description: langObjectReq,
    background: langObjectImg,
    process: langObjectImg,
    features: langObjectImg,
    outcome: langObjectImg,
    conclusion: langObjectImg,
    clientReview: Yup.object().shape({en:optionalString, pl: optionalString, name: optionalString}),
    technology: optionalString,
    liveLink: optionalString,
    gitHubLink: optionalString,
    youtubeLink: optionalString,
    position: Yup.number().min(0),
    asFreelancer: Yup.boolean(),
  });

  return { schema, initValues };
};

export default project;
