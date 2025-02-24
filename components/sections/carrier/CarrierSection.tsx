import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";
import { Carrier } from "@/utils/interfaces/carrier";
import { Timeline } from "@mui/lab";
import { ProgressBars } from "./ProgressBars";
import { CarrierItem } from "./CarrierItem";

type Props = {
  carrier: Carrier;
};

const CarrierSection = ({ carrier }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const sortedCarrier = carrier.sort((a, b) => b.position - a.position);

  return (
    <Box sx={{ width: "100%" }} name="carrier" component="section">
      <Container sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase", mb: isMobile ? 2 : 1, mt: 1 }}>
          {t("carrier.section.header")}
        </Typography>
      </Container>
      <Timeline position="alternate" sx={{ p: 0 }}>
        {sortedCarrier.map((item, idx) => (
          <CarrierItem key={idx} item={item} locale={locale} isMobile={isMobile} />
        ))}
      </Timeline>

      <Box sx={{ margin: "auto", display: "flex", mt: 3 }}>
        <Typography variant="body2" align="center" sx={{ margin: "auto" }}>
          {t("carrier.section.details")}
        </Typography>
      </Box>
      {/* Progress Bars */}
      <ProgressBars locale={locale} carrier={sortedCarrier} />
    </Box>
  );
};

export default CarrierSection;
