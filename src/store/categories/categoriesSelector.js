import { createSelector } from "reselect"

export const selectCategoriesMap = (state) => state.categories.categoriesMap;

const selectCategoryReducer = (state) => state.categories;

export const selectIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
  );