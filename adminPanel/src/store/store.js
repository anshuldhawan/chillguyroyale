import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { Apis } from "../services/api";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import authReducer from "../services/auth";

const rtkQueryErrorLogger = (api) => (next) => async (action) => {
  try {
    console.log("action.payload?.data?.msg ", action.payload?.data?.message);
    if (isRejectedWithValue(action)) {
      if (
        action.payload?.data?.msg === "Missing Authorization Header" ||
        action.payload?.data?.message === "Invalid Token" ||
        action.payload?.data?.message === "Please provide token"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
      }
    }
  } catch (err) {
    /* empty */
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [Apis.reducerPath]: Apis.reducer,
    role: userReducer,
    loader: loaderReducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Apis.middleware).concat(rtkQueryErrorLogger),
});
