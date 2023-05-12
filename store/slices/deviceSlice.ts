import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DeviceState {
  theme: "light" | "dark";
}

const initialState: DeviceState = {
  theme: "dark",
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = deviceSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.device.theme

export default deviceSlice.reducer;
