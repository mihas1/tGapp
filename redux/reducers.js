import {scheme} from './scheme';
import {API_CALL_SUCCESS, API_CALL_FAILURE, SET_SEARCH, SET_PAGE, SIGN, LOADING, TOGGLE_MODAL} from './actions';

export function reducer(state = scheme, action) {
  switch (action.type) {
    case API_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        availableItems: action.payload.availableItems
      };
    case API_CALL_FAILURE:
      return {
        ...state,
        loading: false
      };
    case SIGN:
      return {
        ...state,
        isSignedIn: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search,
        page: action.payload.page,
        items: action.payload.items,
        loading: true
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
        items: action.payload.items,
        loading: true
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: action.payload.modalVisible,
        urlForModal: action.payload.urlForModal
      };
    default:
      return state;
  }
}