export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SIGN = "SIGN";
export const LOADING = "LOADING";
export const SET_SEARCH = "SET_SEARCH";
export const SET_PAGE = "SET_PAGE";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";

export function toggleModalAction(object) {
  return {
    type: TOGGLE_MODAL,
    payload: object,
  }
}

export function loadingAction(boolean) {
  return {
    type: LOADING,
    payload: boolean,
  }
}

export function signInAction(boolean) {
  return {
    type: SIGN,
    payload: boolean,
  }
}

export function setSearchAction(string) {
  return {
    type: SET_SEARCH,
    payload: string,
  }
}

export function setPageAction(object) {
  return {
    type: SET_PAGE,
    payload: object,
  }
}

export function apiRequestSuccessAction(object) {
  return {
    type: API_CALL_SUCCESS,
    payload: object
  }
}

export function apiRequestFailureAction() {
  return {
    type: API_CALL_FAILURE
  }
}
