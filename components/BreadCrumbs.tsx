import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Locale, BreadCrumbs } from "@/interfaces/main";
import Link from "next/link";

type Props = {
  items: BreadCrumbs | null;
};
const BreadCrumbs = ({ items }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      home: "Home",
    },
    pl: {
      home: "Strona Główna",
    },
  };
  return (
    <Box component="nav" sx={{ mb: 2 }}>
      <Stack
        component="ol"
        direction="row"
        spacing={1}
        itemScope={true}
        itemType="http://schema.org/BreadcrumbList"
        sx={{ listStyleType: "none" }}
        divider={
          <Typography variant="body1" component="span" sx={{ opacity: 0.7 }}>
            |
          </Typography>
        }
        flexWrap="wrap" useFlexGap
      >
        <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem">
          {items ? (
            <Link
              href="/#main"
              itemScope={true}
              itemType="http://schema.org/Thing"
              itemProp="item"
              itemID="/#main"
              passHref
            >
              <Typography variant="body2" component="span" itemProp="name" sx={{ opacity: 0.7 }} className="Hover">
                {t[locale].home}
              </Typography>
            </Link>
          ) : (
            <Box itemScope={true} itemType="http://schema.org/Thing" itemProp="item" itemID="/#main">
              <Typography variant="body2" itemProp="name">
                {t[locale].home}
              </Typography>
            </Box>
          )}
          <meta itemProp="position" content="0" />
        </li>

        {items &&
          items.map((item, idx) => (
            <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem" key={idx}>
              {idx >= items.length - 1 ? (
                <Box itemScope={true} itemType="http://schema.org/Thing" itemProp="item" itemID={item.path}>
                  <Typography variant="body2" component="span" itemProp="name">
                    {item.name}
                  </Typography>
                </Box>
              ) : (
                <Link
                  href={item.path}
                  itemScope={true}
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  itemID={item.path}
                  passHref
                >
                  <Typography variant="body2" component="span" itemProp="name" sx={{ opacity: 0.6 }} className="Hover">
                    {item.name}
                  </Typography>
                </Link>
              )}

              <meta itemProp="position" content={(idx + 1).toString()} />
            </li>
          ))}

        {/* <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem">
          <Link
            href="/blog#main"
            itemScope={true}
            itemType="http://schema.org/Thing"
            itemProp="item"
            itemID="/blog"
            passHref
          >
            <small itemProp="name">NAME2</small>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        <li>
          <small>&gt;</small>
        </li>

        <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem">
          <span itemScope={true} itemType="http://schema.org/Thing" itemProp="item" itemID={`/blog${router.asPath}`}>
            <small itemProp="name">NAME3</small>
          </span>
          <meta itemProp="position" content="2" />
        </li> */}
      </Stack>
    </Box>
  );
};

export default BreadCrumbs;
