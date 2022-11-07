import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.stringify({}),
};

export const ImgName = createSlice({
  name: "ImgName",
  initialState,
  reducers: {
    setName: (state, action) => {
      return { value: action.payload };
    },
  },
});

export const { setName } = ImgName.actions;

export default ImgName.reducer;
