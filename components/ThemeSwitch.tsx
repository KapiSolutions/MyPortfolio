import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectTheme, setTheme } from "../store/slices/deviceSlice";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 54,
  height: 30,
  padding: 6,
  "& .MuiSwitch-switchBase": {
    margin: 3,
    padding: 0,
    transform: "translateX(2px)",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          theme.palette.background.default
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.text.secondary,
        transition: theme.transitions.create(["background-color"], {
          duration: 500,
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.text.secondary,
    width: 24,
    height: 24,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      transition: theme.transitions.create(["background-image"], {
        duration: 500,
      }),
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        theme.palette.background.default
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.text.disabled,
    borderRadius: 10,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ThemeSwitch: React.FC = () => {
  const themeState = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"light" | "dark">(themeState);

  useEffect(() => {
    const preferedDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setMode(preferedDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    dispatch(setTheme(mode));
  }, [dispatch, mode]);

  const handleChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <FormControlLabel
      control={<CustomSwitch checked={mode === "dark"} onChange={handleChange} />}
      label=""
      sx={{ m: 0, p: 0 }}
    />
  );
};

export default ThemeSwitch;
