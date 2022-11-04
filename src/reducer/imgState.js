import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ImgState = createSlice({
  name: "ImgState",
  initialState,
  reducers: {
    setState: () => {
      return { value: true };
    },
    unState: () => {
      return { value: false };
    },
  },
});

export const { setState, unState } = ImgState.actions;

export default ImgState.reducer;
