import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesMap: {}
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState, 
  reducers: {
    setCategories(state, action) {
      state.categoriesMap = action.payload;
    },
  }
})

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;