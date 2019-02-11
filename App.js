import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import Home from './components/Home';
import Search from './components/Search';
import Profile from './components/Profile';

import {reducer} from './redux/reducers';
import watcherSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

const AppNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Search: Search,
    Profile: Profile
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden={true} />
        <AppContainer/>
      </Provider>
    );
  }
}