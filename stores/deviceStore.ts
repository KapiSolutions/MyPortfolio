import { create } from "zustand";

interface DeviceState {
  isMobile: boolean;
  setMobile: (state: boolean) => void;
  themeState: "light" | "dark";
  setThemeState: (state: "light" | "dark") => void;
}

export const useDeviceStore = create<DeviceState>()((set) => ({
  isMobile: false,
  themeState: "light",
  setMobile: (state) => set({ isMobile: state }),
  setThemeState: (state) => set({ themeState: state }),
}));
