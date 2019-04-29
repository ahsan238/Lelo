import React from 'react';
import Listproducts from "./../Listproducts/Listproducts"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Listproducts/>
    );
  }
}


