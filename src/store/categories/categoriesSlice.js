import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    categoriesMap: {}
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState, 
  reducers: {
    setCategories(state, action) {
      state.categoriesMap = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
})

export const { setCategories, setIsLoading } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;