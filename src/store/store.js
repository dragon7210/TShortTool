import { configureStore } from "@reduxjs/toolkit";
import ImgName from "../reducer/imgName";
import ImgState from "../reducer/imgState";
import GetColor from "reducer/getColor";
import ChangeColor from "reducer/changeColor";

export const store = configureStore({
  reducer: {
    state: ImgState,
    name: ImgName,
    getColor: GetColor,
    changeColor: ChangeColor,
  },
});
