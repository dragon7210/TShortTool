import { configureStore } from "@reduxjs/toolkit";
import ImgName from "../reducer/imgName";
import ImgState from "../reducer/imgState";

export const store = configureStore({
  reducer: {
    state: ImgState,
    name: ImgName,
  },
});
