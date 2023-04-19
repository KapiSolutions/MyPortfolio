import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";

export const LocaleSwitch = () => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const toggleLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  return (
    <Typography
      variant="button"
      className="pointer"
      onClick={() => {
        toggleLocale(locale === "en" ? "pl" : "en");
      }}
    >
      {locale === "en" ? "pl" : "en"}
    </Typography>
  );
};
