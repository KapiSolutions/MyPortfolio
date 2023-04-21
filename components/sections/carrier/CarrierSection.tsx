import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import { Locale } from "@/interfaces/main";
import { Carrier } from "@/interfaces/carrier";
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
    },
    pl: {
      h: "Kariera",
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
          <CarrierItem key={idx} item={item} locale={locale} />
        ))}
      </Timeline>

      {/* Progress Bars */}
      <ProgressBars locale={locale} carrier={sortedCarrier} />
    </Box>
  );
};

export default CarrierSection;
