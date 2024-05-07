import { createAction } from "../../utils/reducer/reducerUtils";
import { USER_ACTION_TYPES } from "./userTypes";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const emailSignIn = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN, {email, password});

export const googleSignIn = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN);

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFail = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error);

export const signOut = () => createAction(USER_ACTION_TYPES.SIGN_OUT);

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFail = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error);

