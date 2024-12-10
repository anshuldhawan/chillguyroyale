import { createSlice } from "@reduxjs/toolkit";
import { Apis } from "./api";
const userDetailsParsed = JSON.parse(localStorage.getItem("userDetails"));
const initialState = {
  token: null || localStorage.getItem("token"),
  isLoggedIn: null || localStorage.getItem("isLoggedIn"),
  userDetails: null || userDetailsParsed,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setToken, setIsLoggedIn, setUserDetails } = authSlice.actions;
export default authSlice.reducer;

export const authApi = Apis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (formData) => ({
        url: '/user/changePassword',  // Specify your endpoint here
        method: 'POST',
        body: formData,  // Send FormData directly in the body
      }),
    }),
    
   

    overrideExisting: false,
  }),
});

export const {
  useLoginMutation,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useSetPasswordMutation,
} = authApi;
