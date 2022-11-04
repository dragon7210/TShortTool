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
  },
});

export const { setState } = ImgState.actions;

export default ImgState.reducer;
