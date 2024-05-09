import { USER_ACTION_TYPES } from "./userTypes";
import { createSlice } from "@reduxjs/toolkit";
  
const initialState = {
    currentUser: null,
    // isLoading: false, 
    // error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload 
    }
  }
})

export const {setCurrentUser} = userSlice.actions;

export const userReducer = userSlice.reducer;
  
// export const userReducer = (state = INITIAL_STATE, action={}) => {
    // const { type, payload } = action;
  // 
    // switch (type) {
      // case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        // return { ...state, currentUser: payload };
      // case USER_ACTION_TYPES.SIGN_IN_FAIL:
        // return { ...state, error: payload, isLoading: false}
      // case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
        // return { ...state, currentUser: null };
      // case USER_ACTION_T YPES.SIGN_UP_FAIL:
      // case USER_ACTION_TYPES.SIGN_OUT_FAIL:
      // default:
        // return state;
    // }
  // };