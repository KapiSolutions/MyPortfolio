import React from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Locale } from "@/utils/i18n";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";

export const LocaleSwitch = () => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const toggleLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale, scroll: false });
  };
  return (
    <>
      {isMobile ? (
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          spacing={2}
          onClick={() => {
            toggleLocale(locale === "en" ? "pl" : "en");
          }}
        >
          <Typography variant="button" className="pointer">
            {locale === "en" ? "en" : "pl"}
          </Typography>
          <MultipleStopIcon />
          <Typography variant="button" className="pointer">
            {locale === "en" ? "pl" : "en"}
          </Typography>
        </Stack>
      ) : (
        <Typography
          variant="button"
          className="pointer"
          onClick={() => {
            toggleLocale(locale === "en" ? "pl" : "en");
          }}
        >
          {locale === "en" ? "pl" : "en"}
        </Typography>
      )}
    </>
  );
};
