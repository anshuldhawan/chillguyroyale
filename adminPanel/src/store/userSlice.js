import { createSlice } from "@reduxjs/toolkit";


const data = localStorage.getItem("user");

const initialState = {
  userRole: "",
};
const roleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    
  },
});

export const { setUserRole } = roleSlice.actions;
export default roleSlice.reducer;
