import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const GetColor = createSlice({
  name: "GetColor",
  initialState,
  reducers: {
    getColor: (state, action) => {
      return { value: action.payload };
    },
  },
});

export const { getColor } = GetColor.actions;

export default GetColor.reducer;
