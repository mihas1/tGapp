import React from 'react';
import {StyleSheet, View, Text, AsyncStorage, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {FontAwesome as Icon, Ionicons} from '@expo/vector-icons';
import getGithubTokenAsync from '../getGithubTokenAsync';
import {
  loadingAction,
  signInAction
} from '../redux/actions'

const GithubStorageKey = '@Expo:GithubToken';
const firebaseConfig = {
  apiKey: 'AIzaSyD6RBDRKTWj58rlvvZM9sax9CX1tw3MqMY',
  authDomain: 'gapp-fff70.firebaseapp.com',
  databaseURL: 'https://gapp-fff70.firebaseio.com',
  projectId: 'gapp-fff70',
  storageBucket: 'gapp-fff70.appspot.com',
  messagingSenderId: '607238868331'
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

export async function signInAsync(token) {
  try {
    if (!token) {
      const token = await getGithubTokenAsync();

      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token);
        return signInAsync(token);
      } else {
        return;
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  } catch ({message}) {
    alert(message);
  }
}

export async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert('Error: ' + message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    console.log('Sign in with token', token);
    return signInAsync(token);
  }
}

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: () => <Ionicons name='md-home' size={25} color="#000" />
  };

  componentDidMount() {
    this.auth();
  }

  auth = async () => {
    const {signInAction} = this.props;

    initializeFirebase();

    firebase.auth().onAuthStateChanged(async auth => {
      const isSignedIn = !!auth;
      signInAction(isSignedIn);

      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  render() {
    const {isSignedIn} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>
            Hi:) You are {isSignedIn ? 'signed' : 'not signed'}
          </Text>
          {
            !(isSignedIn)
            &&
            <Icon.Button name='github' color='black' backgroundColor='transparent' onPress={() => signInAsync()}>
              Sign In with Github
            </Icon.Button>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = store => {
  return {
    isSignedIn: store.isSignedIn,
    loading: store.loading,
  }
};

const mapDispatchToProps = dispatch => ({
  loadingAction: boolean => dispatch(loadingAction(boolean)),
  signInAction: boolean => dispatch(signInAction(boolean)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)