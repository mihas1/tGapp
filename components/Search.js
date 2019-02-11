import React from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, TouchableHighlight, Modal} from 'react-native';
import {
  setPageAction,
  setSearchAction,
  toggleModalAction
} from '../redux/actions';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import Item from './Item';
import MyModal from './MyModal';

export async function getRepos(search, page) {
  const url = `https://api.github.com/search/repositories?q=${search}:name&sort=stars&order=desc&page=${page}&per_page=15`;
  console.log(url);
  return fetch(url).then(res => res.json());
}

class Search extends React.Component {
  static navigationOptions = {
    title: 'Search',
    tabBarIcon: () => <Ionicons name='md-search' size={25} color="#000" />
  };

  initNewRepos = () => {
    const {items, search, loading, page, availableItems, setPageAction} = this.props;

    if (items.length >= availableItems) return false;

    if (!loading) {
      setPageAction({
        page: page + 1,
        search: search,
        items: items
      });
    }
  };

  onSubmitEditing = (e) => {
    const {setSearchAction} = this.props;

    setSearchAction({
      search: e.nativeEvent.text.replace(/ /g, '+'),
      page: 1,
      items: []
    });
  };

  toggleModal = (boolean, url) => {
    console.log(boolean, url);
    this.props.toggleModalAction({modalVisible: boolean, urlForModal: url})
  };

  _keyExtractor = (item, index) => item.html_url;

  _renderItem = ({item}) => (
    <TouchableHighlight onPress={() => this.toggleModal(true, item.html_url)} style={{marginBottom: 5, borderRadius: 5}}>
      <Item
        name={item.name}
        description={item.description}
        forks_count={item.forks_count}
        stargazers_count={item.stargazers_count}
      />
    </TouchableHighlight>
  );

  render() {
    const {items, loading, isSignedIn, modalVisible} = this.props;

    if (!isSignedIn) {
      return (
        <View style={styles.loaderWrapper}>
          <Text>Please, Sign in at Home</Text>
        </View>
      );
    }


    if (modalVisible) {
      return (
        <View>
          <MyModal />
        </View>
      )
    }

    return (
      <View style={styles.content}>
        <TextInput
          style={styles.search}
          placeholderTextColor={'#000'}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={'Search here...'}
        />
        {
          loading && !items.length
          ?
            <View style={styles.loaderWrapper}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          :
            <>
              <FlatList
                data={items}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this.initNewRepos}
                onEndReachedThreshold={0.3}
                refreshing={loading}
              />
              {
                loading
                &&
                <ActivityIndicator style={{alignSelf: 'center'}} size="large" color="#0000ff" />
              }
            </>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    minWidth: '100%',
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cecece',
    width: 200,
    marginBottom: 5
  },
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%'
  },
  content: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minWidth: '100%'
  }
});

const mapStateToProps = store => {
  return {
    availableItems: store.availableItems,
    isSignedIn: store.isSignedIn,
    items: store.items,
    search: store.search,
    page: store.page,
    loading: store.loading,
    modalVisible: store.modalVisible
  }
};

const mapDispatchToProps = dispatch => ({
  setSearchAction: object => dispatch(setSearchAction(object)),
  setPageAction: object => dispatch(setPageAction(object)),
  toggleModalAction: object => dispatch(toggleModalAction(object))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)