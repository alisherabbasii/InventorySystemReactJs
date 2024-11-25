import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    userId:'',
    token:'',
    userType: '',
  };
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state) => {
        state.isAuthenticated = true;
      },
  
      setUserId: (state, action) => {
        state.userId = action.payload;
      },
      setToken: (state, action) => {
        state.token = action.payload;
      },
      logout: () => {
        return initialState;
      },

      setUserType: (state, action) => {
        state.userType = action.payload;
      },
    }
  });

export default authSlice.reducer;
export const authActions = authSlice.actions;