import {all, call, put, takeLatest} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';
import { fetchCategoriesSuccess, fetchCategoriesFail } from './categoriesAction';
import { CATEGORIES_ACTION_TYPES } from './categoryTypes';

export function* fetchCategories() {
    try {
        const categoryMap = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoryMap));
    } catch (error) {
        yield put(fetchCategoriesFail(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_REGUEST, fetchCategories);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}