import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import { Locale } from "@/utils/interfaces/main";
import { Carrier } from "@/utils/interfaces/carrier";
import { Timeline } from "@mui/lab";
import { ProgressBars } from "./ProgressBars";
import { CarrierItem } from "./CarrierItem";

//Define Types:
type Props = {
  carrier: Carrier;
};

const CarrierSection = ({ carrier }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const sortedCarrier = carrier.sort((a, b) => b.position - a.position);
  const t = {
    en: {
      h: "Carrier",
      clickForDetails: "Click on the time line for details.",
    },
    pl: {
      h: "Kariera",
      clickForDetails: "Kliknij w wybrany etap, aby zobaczyć szczegóły.",
    },
  };

  return (
    <Box sx={{ width: "100%" }} name="carrierSection">
      <Container>
        <Typography variant="h2" sx={{ m: isMobile ? 2 : 0 }}>
          {t[locale]?.h}
        </Typography>
      </Container>
      <Timeline position="alternate" sx={{ p: 0 }}>
        {sortedCarrier.map((item, idx) => (
          <CarrierItem key={idx} item={item} locale={locale} isMobile={isMobile} />
        ))}
      </Timeline>

      <Box sx={{ margin: "auto", display: "flex", mt: 3 }}>
        <Typography variant="body2" align="center" sx={{ margin: "auto" }}>
          {t[locale].clickForDetails}
        </Typography>
      </Box>
      {/* Progress Bars */}
      <ProgressBars locale={locale} carrier={sortedCarrier} />
    </Box>
  );
};

export default CarrierSection;
