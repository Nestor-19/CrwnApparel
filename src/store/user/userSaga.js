import {all, call, put, takeLatest} from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './userTypes';
import { signInSuccess, signInFail, signOutFail, signOutSuccess } from './userAction';
import { getCurrentUser, createUserDocument, signInWithGooglePopUp, signInWithEmailAndPass, signOutUser } from '../../utils/firebase/firebase';


export function* getUserSnapShot(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(createUserDocument, userAuth, additionalInfo);
        console.log(userSnapshot);
        console.log(userSnapshot.data());
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error) {
        yield put(signInFail(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) {return;}
        yield call(getUserSnapShot, userAuth);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithGoogle() {
    try {
        const userAuth = yield call(signInWithGooglePopUp);
        yield call(getUserSnapShot, userAuth.user);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithEmail({payload}) {
    try {
        const userAuth = yield call(signInWithEmailAndPass, payload.email, payload.password);
        yield call(getUserSnapShot, userAuth.user);
    } catch (error) {
        yield put(signOutFail(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* onSignOutUser() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOut)
}

export function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN, signInWithEmail)
}

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
    yield all([call(onCheckUserSession), call(onGoogleSignIn), call(onEmailSignIn), call(onSignOutUser)]);
}