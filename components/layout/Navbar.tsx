import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CodeIcon from "@mui/icons-material/Code";
import ThemeSwitch from "../ThemeSwitch";
import { getTranslation, Locale } from "@/utils/i18n";
import { LocaleSwitch } from "../LocaleSwitch";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";

const pages = {
  en: ["Projects", "Carrier Path", "Contact"],
  pl: ["Projekty", "Kariera", "Kontakt"],
  sections: ["projects", "carrier", "contact"],
};

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const [loading, setLoading] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElNavLg, setAnchorElNavLg] = useState<null | HTMLElement>(null);
  const { user, error, isLoading } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  // Mobile menu handlers
  const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const closeNavMenu = () => {
    setAnchorElNav(null);
  };
  // Desktop menu admin handlers
  const openNavMenuLg = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavLg(event.currentTarget);
  };
  const closeNavMenuLg = () => {
    setAnchorElNavLg(null);
  };

  // Add backdrop on loading new page
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
    return () => {
      router.events.off("routeChangeStart", () => {});
      router.events.off("routeChangeComplete", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scrolling actions on the home page when the user redirects to it
  useEffect(() => {
    if (window.location.hash && router.pathname == "/") {
      const name = window.location.hash.replace("#", "");
      const element = document.getElementsByName(name)[0];
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    }
  }, [router.pathname]);

  const scrollToSection = async (name: string) => {
    if (router.pathname === "/") {
      const element = document.getElementsByName(name)[0];
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    } else {
      await router.push("/", undefined, { scroll: false });
      const element = document.getElementsByName(name)[0];
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    }
  };

  const brandButtonAction = () => {
    if (router.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
  };

  return (
    <Box>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        elevation={1}
        sx={{
          zIndex: 1000,
          position: "fixed",
          width: "100%",
          pl: 3,
          pr: 3,
          borderRadius: 0,
          backgroundColor: "background.nav",
          backdropFilter: "blur(16px) saturate(180%)",
        }}
        component="nav"
      >
        {/* Mobile View */}
        {isMobile ? (
          <Stack direction="row" alignItems="center" sx={{ width: "100%", pt: 1, pb: 1 }}>
            <Box>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openNavMenu}
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
                onClose={closeNavMenu}
                disableScrollLock={true}
                sx={{
                  transform: "translateY(12px) translateX(-20px)",
                  "& .MuiMenu-paper": {
                    backgroundColor: "background.contrast",
                    backdropFilter: "blur(24px) saturate(180%)",
                  },
                }}
              >
                {pages[locale]?.map((page, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      closeNavMenu();
                      scrollToSection(pages.sections[idx]);
                    }}
                    divider={idx == pages[locale].length - 1 ? true : false}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}

                <MenuItem onClick={closeNavMenu} divider>
                  <LocaleSwitch />
                </MenuItem>

                {/* Admin controls */}
                {user ? (
                  <Box sx={{ mt: 2 }}>
                    <MenuItem onClick={closeNavMenu}>
                      <Stack direction="row" spacing={1}>
                        <SettingsIcon color="secondary" />
                        <Link href="/admin/projects#main">
                          <Typography textAlign="center" color="secondary" component="span">
                            Projects
                          </Typography>
                        </Link>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={closeNavMenu}>
                      <Stack direction="row" spacing={1}>
                        <LogoutIcon color="secondary" />
                        <Typography textAlign="center" color="secondary" component="span">
                          <a href="/api/auth/logout">Log out</a>
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Box>
                ) : null}
              </Menu>
            </Box>

            <Stack
              sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
              className="pointer"
              onClick={brandButtonAction}
            >
              <CodeIcon />
              <Typography
                noWrap
                sx={{
                  letterSpacing: ".3rem",
                  fontSize: "6px",
                  color: "inherit",
                }}
              >
                KAPISOLUTIONS
              </Typography>
            </Stack>
            <ThemeSwitch />
          </Stack>
        ) : (
          // Desktop View
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%", pt: 1, pb: 1 }}>
            <Box className="pointer" onClick={brandButtonAction} sx={{ display: "flex", mr: 1 }}>
              <CodeIcon />
            </Box>
            <Stack direction="row" sx={{ flexGrow: 1 }}>
              {pages[locale]?.map((page, idx) => (
                <Button
                  key={page}
                  onClick={() => {
                    closeNavMenu();
                    scrollToSection(pages.sections[idx]);
                  }}
                  sx={{ color: "text.primary", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              {/* Admin Menu */}
              {user ? (
                <Stack direction="row" sx={{ ml: 2 }} spacing={1}>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    aria-label="menuAdminLg"
                    aria-controls="menuAdminLg"
                    aria-haspopup="true"
                    onClick={openNavMenuLg}
                    color="inherit"
                  >
                    <AdminPanelSettingsIcon />
                    <Typography textAlign="center" sx={{ ml: 1 }}>
                      Admin
                    </Typography>
                  </Button>
                  <Menu
                    id="menuAdminLg"
                    anchorEl={anchorElNavLg}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNavLg)}
                    onClose={closeNavMenuLg}
                    disableScrollLock={true}
                    sx={{ transform: "translateY(12px)" }}
                  >
                    <MenuItem onClick={closeNavMenuLg} divider>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <SettingsIcon sx={{ fontSize: "medium" }} />
                        <Link href="/admin/projects#main">
                          <Typography textAlign="center" component="span">
                            Projects
                          </Typography>
                        </Link>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={closeNavMenuLg} divider>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LogoutIcon sx={{ fontSize: "medium" }} />
                        <Typography textAlign="center">
                          <a href="/api/auth/logout">Log out</a>
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                </Stack>
              ) : null}
            </Stack>
            {/* Side menu with options */}
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
    </Box>
  );
};
export default Navbar;
