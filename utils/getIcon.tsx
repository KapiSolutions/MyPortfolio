import React from "react";
import {
  TbBrandNextjs,
  TbBrandRedux,
  TbBrandBootstrap,
  TbBrandCss3,
  TbBrandHtml5,
  TbBrandTypescript,
  TbBrandMongodb,
  TbBrandFirebase,
  TbBrandPhp,
  TbBrandPython,
} from "react-icons/tb";
import { FaNodeJs, FaReact, FaStripe, FaRaspberryPi, FaSass } from "react-icons/fa";
import { MdOutlineJavascript } from "react-icons/md";
import { SiMysql, SiSocketdotio, SiExpress, SiJavascript } from "react-icons/si";

const styles = {
  techIcon: {
    width: 14,
    height: 14,
  },
};
const getIcon = (tech: string): JSX.Element | null => {
  switch (tech) {
    case "react":
      return <FaReact style={styles.techIcon} />;
    case "next.js":
      return <TbBrandNextjs style={styles.techIcon} />;
    case "node.js":
      return <FaNodeJs style={styles.techIcon} />;
    case "socket.io":
      return <SiSocketdotio style={styles.techIcon} />;
    case "express.js":
      return <SiExpress style={styles.techIcon} />;
    case "redux":
      return <TbBrandRedux style={styles.techIcon} />;
    case "bootstrap":
      return <TbBrandBootstrap style={styles.techIcon} />;
    case "sass":
      return <FaSass style={styles.techIcon} />;
    case "css":
      return <TbBrandCss3 style={styles.techIcon} />;
    case "html":
      return <TbBrandHtml5 style={styles.techIcon} />;
    case "javascript":
      return <SiJavascript style={styles.techIcon} />;
    case "typescript":
      return <TbBrandTypescript style={styles.techIcon} />;
    case "php":
      return <TbBrandPhp style={styles.techIcon} />;
    case "mysql":
      return <SiMysql style={styles.techIcon} />;
    case "mongodb":
      return <TbBrandMongodb style={styles.techIcon} />;
    case "firebase":
      return <TbBrandFirebase style={styles.techIcon} />;
    case "stripe":
      return <FaStripe style={styles.techIcon} />;
    case "raspberry":
      return <FaRaspberryPi style={styles.techIcon} />;
    case "python":
      return <TbBrandPython style={styles.techIcon} />;
    default:
      return null;
  }
};

export default getIcon;
