import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Item extends React.Component {
  render() {
    const {name, description, forks_count, stargazers_count} = this.props;

    let desc = description || 0;
    if (desc.length > 1000) {
      desc = desc.substr(0, 1000) + '...';
    }

    return (
      <View style={styles.repoItem}>
        <View style={styles.repoItemHead}>
          <Text style={styles.repoItemName}>{name || 'error(no name repo)'}</Text>
          <View style={styles.repoItemCounts}>
            <View style={styles.repoItemCountsItem}>
              <Icon name='star' style={styles.icon}/>
              <Text>{stargazers_count || 0}</Text>
            </View>
            <View style={styles.repoItemCountsItem}>
              <Icon name='code-fork' style={styles.icon}/>
              <Text>{forks_count || 0}</Text>
            </View>
          </View>
        </View>
        <Text>{desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repoItem: {
    maxWidth: '100%',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: '#e4e8e9'
  },
  repoItemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  repoItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '70%'
  },
  icon: {
    fontSize: 12,
    marginRight: 5,
    marginLeft: 5
  },
  star: {},
  fork: {},
  repoItemCounts: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  repoItemCountsItem: {
    flexDirection: 'row',
    marginLeft: 5
  },
});