import React from 'react';
import styles from "./style";
import { AppLoading, Icon } from 'expo';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import {Thumbnail} from 'native-base';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      isLoading: true,
    }
  }
  
  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/'+ userId).once('value', function (snapshot) {
      const user = snapshot.val();
      console.log(user);
      this.setState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isLoading: false,
      });
    }.bind(this));
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    } else {
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
                centerComponent={{ text: 'Profile',size: 26,style: { color: '#fff' } }}
                rightComponent={
                <Button 
                  onPress={() => {
                    // console.log('logged out');
                    this.props.navigation.navigate("EditProfile");
                  }}
                  icon={
                    <Icon.AntDesign
                      name={'edit'}
                      color={'white'}
                      size={26}
                      // style={{ marginBottom: 15 }}
                    />
                  }
                />}
              />
              <Image
                source={require('../../assets/images/male_user.png')}
                style={styles.welcomeImage}
              />
            </View>

            <View style={styles.getStartedContainer}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.email}>{this.state.email}</Text>
              <Text style={styles.phone}>{this.state.phone}</Text>
              <Text style={styles.address}>{this.state.address}</Text>
            </View>
            <View
              style={{
                width: Dimensions.get("window").width / 3 + 20,
                marginTop: Dimensions.get("window").height / 50,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignSelf: "center"
              }}
            >
              <Thumbnail
                square
                small
                source={require('../../assets/images/phone.png')}
              />
              <Thumbnail
                square
                small
                source={require('../../assets/images/msg.jpg')}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}