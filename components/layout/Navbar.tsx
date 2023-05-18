import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { FaCodeBranch } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import {
  Divider,
  Stack,
  Menu,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { Locale } from "@/interfaces/main";
import { LocaleSwitch } from "../LocaleSwitch";
import { useRouter } from "next/router";

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const pages = {
    en: ["My Works", "Carrier Path", "About Me"],
    pl: ["Projekty", "Kariera", "O mnie"],
    sections: ["projectsSection", "carrierSection", "aboutMeSection"],
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (name: string) => {
    const element = document.getElementsByName(name)[0];
    window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
  };

  const brandButtonAction = () => {
    if (router.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
  };

  return (
    <Paper elevation={4} sx={{ zIndex: 1100, position: "fixed", width: "100%", pl: 3, pr: 3 }} component="nav">
      {isMobile ? (
        <Stack direction="row" alignItems="center" sx={{ width: "100%", pt: 1, pb: 1 }}>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              disableScrollLock={true}
              sx={{ transform: "translateY(6px)" }}
            >
              {pages[locale]?.map((page, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    handleCloseNavMenu();
                    scrollToSection(pages.sections[idx]);
                  }}
                  divider={idx == pages[locale].length - 1 ? true : false}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu} divider>
                <LocaleSwitch />
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1 }} className="pointer" onClick={brandButtonAction}>
            <FaCodeBranch />
            <Typography
              variant="h5"
              noWrap
              component="span"
              sx={{
                ml: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JK
            </Typography>
          </Box>
          <ThemeSwitch />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" sx={{ width: "100%", pt: 1, pb: 1 }}>
          <Box className="pointer" onClick={brandButtonAction}>
            <FaCodeBranch />
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                ml: 1,
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JK
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexGrow: 1 }}>
            {pages[locale]?.map((page, idx) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  scrollToSection(pages.sections[idx]);
                }}
                sx={{ color: "text.primary", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{ transform: "translateX(5px)" }}>
              <ThemeSwitch />
            </Box>
            <LocaleSwitch />
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};
export default Navbar;
