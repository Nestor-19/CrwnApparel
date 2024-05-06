import { createAction } from "../../utils/reducer/reducerUtils";
import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

export const fetchCategoriesRequest = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_REGUEST);

export const fetchCategoriesSuccess = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesMap); 

export const fetchCategoriesFail = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);

export const fetchCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
        const categoryMap = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoryMap));
    } catch (error) {
        dispatch(fetchCategoriesFail(error));
    }

}
