type Lang = {
  en: string | Array<string>;
  pl: string | Array<string>;
};
export interface Job {
  id: string;
  position: number;
  companyName: Lang;
  as: Lang;
  type: string;
  companyDescription: Lang;
  jobDescription: Lang;
  companyImage: string;
  projectsDone: number;
  projectExamples: Array<string>;
  responsibilities: Lang;
  technology: Array<string>;
  images: Array<string>;
  dateStart: string;
  dateEnd: string;
  summary: string;
}
export interface Carrier extends Array<Job> {}
