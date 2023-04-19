import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import CodeIcon from "@mui/icons-material/Code";
import { FaCodeBranch } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";
import {
  Divider,
  Stack,
  Menu,
  MenuItem,
  Button,
  Container,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  useTheme,
  useMediaQuery,
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
    document.getElementsByName(name)[0].scrollIntoView({ block: "start", inline: "nearest" });
  };

  const brandButtonAction = () => {
    if (router.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        {isMobile ? (
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
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
          </Toolbar>
        ) : (
          <Toolbar disableGutters>
            <Link href="/" className="pointer">
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
            </Link>
            <Stack direction="row" sx={{ flexGrow: 1 }}>
              {pages[locale]?.map((page, idx) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    scrollToSection(pages.sections[idx]);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
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
              component="nav"
            >
              <Box sx={{ transform: "translateX(5px)" }}>
                <ThemeSwitch />
              </Box>
              <LocaleSwitch />
            </Stack>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
};
export default Navbar;
