import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";

const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {},
    isLoading: false,
    error: null
};

export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_REGUEST:
        // this is when the API request begins
        return { ...state, isLoading: true}
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
        return { ...state, categoriesMap: payload, isLoading: false };
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
        return { ...state, error: payload, isLoading: false };
      default:
        return state;
    }
}