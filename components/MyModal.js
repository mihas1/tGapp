import React from 'react';
import {Text, StyleSheet, View, Image, Button, TouchableHighlight, Modal} from 'react-native';
import { WebView } from "react-native-webview";
import {loadingAction, setPageAction, setSearchAction, signInAction, toggleModalAction} from '../redux/actions';
import {connect} from 'react-redux';

class MyModal extends React.Component {
  toggleModal = (boolean, url) => {
    console.log(boolean, url);
    this.props.toggleModalAction({modalVisible: boolean, urlForModal: url})
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => this.toggleModal(false, '')}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <Button onPress={() => this.toggleModal(false, '')} title={'Hide Modal'}/>
              <WebView
                source={{uri: this.props.urlForModal}}
                style={{marginTop: 20, backgroundColor: '#ffcece'}}
              />
            </View>
          </View>
        </Modal>
      </View>

    );
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
    modalVisible: store.modalVisible,
    urlForModal: store.urlForModal
  }
};

const mapDispatchToProps = dispatch => ({
  toggleModalAction: object => dispatch(toggleModalAction(object))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)