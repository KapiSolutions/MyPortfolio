type Lang = {
  en: string;
  pl: string;
};
export type Locale = keyof Lang;

type Images = {
  images: Array<string>;
};

export interface Project {
  id: string;
  title: Lang;
  shortDesc: Lang;
  description: Lang;
  background: Lang & Images;
  process: Lang & Images;
  features: Lang & Images;
  outcome: Lang & Images;
  conclusion: Lang & Images;
  clientReview: Lang & { name: string };
  asFreelancer: boolean;
  technology: Array<string>;
  liveLink: string;
  gitHubLink: string;
  youtubeLink: string;
  image: string;
}
export interface Projects extends Array<Project> {}
