type Lang = {
  en: string;
  pl: string;
};
export type Locale = keyof Lang;

type BreadCrumb = {
  name: string;
  path: string;
};
export interface BreadCrumbs extends Array<BreadCrumb> {}

