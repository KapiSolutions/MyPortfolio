import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { Locale } from "@/interfaces/main";

const BookBoxSection = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = {
    en: {
      h: "BookBox Section",
    },
    pl: {
      h: "BookBox Section",
    },
  };
  return (
    <Box sx={{width: "100vw", height: "90vh",backgroundColor: "divider", p:2}}>
      <Typography variant="h2">{t[locale]?.h}</Typography>
    </Box>
  );
};

export default BookBoxSection;
