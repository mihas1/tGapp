import React from 'react';
import {Text, StyleSheet, View, Image, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';
import {loadingAction, signInAction} from '../redux/actions';
import {connect} from 'react-redux';
import {signOutAsync} from './Home';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: () => <Ionicons name='md-settings' size={25} color='#000'/>
  };

  render() {
    const {isSignedIn} = this.props;

    if (isSignedIn) {
      const user = firebase.auth().currentUser || {};

      return (
        <View style={styles.container}>
          <Image source={{uri: user.photoURL}} style={styles.image}/>
          <Text>Name: {user.displayName}</Text>
          <Text>Email: {user.email}</Text>
          <Button onPress={signOutAsync} title={'Logout'}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Please, Sign in at Home</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50
  }
});

const mapStateToProps = store => {
  return {
    isSignedIn: store.isSignedIn,
    loading: store.loading,
  }
};

const mapDispatchToProps = dispatch => ({
  loadingAction: loading => dispatch(loadingAction(loading)),
  signInAction: signed => dispatch(signInAction(signed)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)