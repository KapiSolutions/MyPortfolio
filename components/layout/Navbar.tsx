import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
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
  useMediaQuery,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  useTheme,
} from "@mui/material";
import { Locale } from "@/interfaces/main";
import { LocaleSwitch } from "../LocaleSwitch";

//Define Types:
type Props = {
  locale: Locale;
};

const Navbar = ({ locale }: Props): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const pages = {
    en: ["My Works", "About Me"],
    pl: ["Projekty", "O mnie"],
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="span"
              className="pointer"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages[locale].map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JK
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages[locale].map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
          {/* ThemeSwitch */}
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            component="nav"
          >
            <Box sx={{ transform: isMobile ? "none" : "translateX(5px)" }}>
              <ThemeSwitch />
            </Box>
            {isMobile ? null : <LocaleSwitch />}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
