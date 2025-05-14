"use client";
import { Layout } from "@shared/types/Layout";
import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

interface LocationData {
  lon: string;
  lat: string;
  cityName: string;
}

const initialLocation: { value: LocationData } = {
  value: {
    lat: "50.450001",
    lon: "30.523333",
    cityName: "Kyiv",
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocation,
  reducers: {
    updateLocation(state, action: PayloadAction<LocationData>) {
      state.value = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { location: locationSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const { updateLocation } = locationSlice.actions;

export default function StoreProvider({ children }: Layout) {
  return <Provider store={store}>{children}</Provider>;
}