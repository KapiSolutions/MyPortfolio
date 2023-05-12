import React from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import { Locale } from "@/interfaces/main";

const BookBoxSection = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = {
    en: {
      h: "BookBox",
    },
    pl: {
      h: "BookBox",
    },
  };
  return (
    <Box sx={{ width: "100vw", height: "90vh", backgroundColor: "divider" }}>
      <Container>
        <Typography variant="h2">{t[locale]?.h}</Typography>
        {/* <iframe
          src="https://myhub.autodesk360.com/ue290b326/shares/public/SHd38bfQT1fb47330c99108e411f643e6476?mode=embed"
          allowFullScreen={true}
          style={{ height: "75vh", width: "100%", border: "none", margin: "auto" }}
        ></iframe> */}
      </Container>
    </Box>
  );
};

export default BookBoxSection;
