import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const ChangeColor = createSlice({
  name: "ChangeColor",
  initialState,
  reducers: {
    setChangeColor: (state, action) => {
      return { value: action.payload };
    },
  },
});

export const { setChangeColor } = ChangeColor.actions;

export default ChangeColor.reducer;
