import React from 'react';
import styles from "./style";
import { Icon } from 'expo';
// import ProductCard from "../../components/productCard";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Header,Button,ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Header
              leftComponent={
              <Button
                onPress={() => {
                  console.log('logged out');
                  this.props.navigation.navigate("Login");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                    color={'white'}
                    size={26}
                    // style={{ marginBottom: 15 }}
                  />
                }
              />}
              centerComponent={{ text: 'Home',size: 26,style: { color: '#fff' } }}
            />
            <Image
              source={require('../../assets/images/robot-dev.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>User Profile</Text>
          </View>
        </ScrollView>

      </View>
    );
  }
}
