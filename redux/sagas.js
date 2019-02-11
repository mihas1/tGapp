import {all, call, put, takeEvery} from 'redux-saga/effects';
import {getRepos} from '../components/Search';
import {
  SET_PAGE,
  SET_SEARCH,
  apiRequestSuccessAction,
  apiRequestFailureAction,
} from './actions';
//availableItems
function* loadRepos(action) {
  try {
    const response = yield call(getRepos, action.payload.search, action.payload.page);
    const availableItems = parseFloat(response.total_count) || response.items.length;

    if ('items' in action.payload) {
      yield put(
        apiRequestSuccessAction({
          items: action.payload.items.concat(response.items),
          availableItems: availableItems
        }));
    } else {
      yield put(
        apiRequestSuccessAction({
          items: response.items,
          availableItems: availableItems
        }));
    }
  } catch (e) {
    console.log(e);
    yield put(apiRequestFailureAction());
  }
}

function* watcherSaga() {
  yield all([
    takeEvery(SET_PAGE, loadRepos),
    takeEvery(SET_SEARCH, loadRepos),
  ]);
}

export default watcherSaga;