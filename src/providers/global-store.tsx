"use client";
import { Layout } from "@/shared/types/Layout";
import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const initialState: {
  value: {
    lon:string,
    lat:string,
    name:string
  };
} = {
  value: {
    lat:"50.450001",
    lon:"30.523333",
    name:"Kyiv"
  },
};

const cityNameSlice = createSlice({
  name: "cityName",
  initialState,

  reducers: {
    setCityName(state, action: PayloadAction<{
      lon:string,
      lat:string,
      name:string,
    }>) {
      state.value = action.payload;
    },
  },
});

export const globalStore = configureStore({
  reducer: { cityName: cityNameSlice.reducer },
});
export type RootState = ReturnType<typeof globalStore.getState>
export const { setCityName } = cityNameSlice.actions;

export default function GlobalStateProvider({children}:Layout) {
  return (
    <Provider store={globalStore}>{children}</Provider>
  );
}
