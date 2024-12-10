import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../config";

export const Apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.BASE_URL,
    // eslint-disable-next-line no-empty-pattern
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
