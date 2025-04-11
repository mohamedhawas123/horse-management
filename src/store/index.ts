import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import horsesReducer from "../features/horses/horsesSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    horses: horsesReducer,
    theme: themeReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
