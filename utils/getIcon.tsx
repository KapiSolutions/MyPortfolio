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
  } from "react-icons/tb";
  import { FaNodeJs, FaReact, FaStripe, FaRaspberryPi, FaSass } from "react-icons/fa";
  import { MdOutlineJavascript } from "react-icons/md";
  import { SiMysql } from "react-icons/si";

const styles = {
    techIcon: {
      width: 14,
      height: 14,
    },
  };
const getIcon = (tech:string): JSX.Element | null => {
    switch (tech) {
      case "React":
        return <FaReact style={styles.techIcon} />;
      case "Next.js":
        return <TbBrandNextjs style={styles.techIcon} />;
      case "Node.js":
        return <FaNodeJs style={styles.techIcon} />;
      case "Redux":
        return <TbBrandRedux style={styles.techIcon} />;
      case "Bootstrap":
        return <TbBrandBootstrap style={styles.techIcon} />;
      case "Sass":
        return <FaSass style={styles.techIcon} />;
      case "Css":
        return <TbBrandCss3 style={styles.techIcon} />;
      case "Html":
        return <TbBrandHtml5 style={styles.techIcon} />;
      case "vanillaJS":
        return <MdOutlineJavascript style={styles.techIcon} />;
      case "TypeScript":
        return <TbBrandTypescript style={styles.techIcon} />;
      case "Php":
        return <TbBrandPhp style={styles.techIcon} />;
      case "MySql":
        return <SiMysql style={styles.techIcon} />;
      case "MongoDB":
        return <TbBrandMongodb style={styles.techIcon} />;
      case "Firebase":
        return <TbBrandFirebase style={styles.techIcon} />;
      case "Stripe":
        return <FaStripe style={styles.techIcon} />;
      case "Raspberry":
        return <FaRaspberryPi style={styles.techIcon} />;
      default:
        return null;
    }
  };

export default getIcon