import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/layout/grid.module.scss";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";

//Define Types:
type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  return (
    <div className={styles.container}>
      <Header locale={locale} />
      <main name="main" className={styles.main}>
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
};

export default Layout;
