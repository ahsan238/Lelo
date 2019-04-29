import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { YellowBox, StyleSheet, View, Text, I18nManager } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import MainApp from './MainApp'
import firebase from 'firebase'
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = { ...console };
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

I18nManager.forceRTL(false);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Welcome to LeLo',
    text: 'Lelo is an exclusive LUMS based project ',
    icon: "heart" ,
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: 'Create an account. It is free!',
    text: 'Quickly create an account with a LUMS email account',
    icon: 'addusergroup',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun2',
    title: 'We will take care of your needs',
    text: '',
    icon: 'layout',
    colors: ['#29ABE2', '#4F00BC'],
  },
];

export default class App extends React.Component {

  constructor(props){
    super(props)
    console.disableYellowBox = true;
    this.state = {
      intro: true
    }
  }

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCBR6Vg1OUAXK7KU0sMya0lrbBBS0R9mx4",
      authDomain: "lelo-b176e.firebaseapp.com",
      databaseURL: "https://lelo-b176e.firebaseio.com",
      projectId: "lelo-b176e",
      storageBucket: "lelo-b176e.appspot.com",
      messagingSenderId: "20878009337"
      };
    firebase.initializeApp(config);
  }

  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <AntDesign
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    if(this.state.intro){
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          showPrevButton
          showSkipButton
          onDone={() => this.setState({intro: false})}
        />
      );
    } else {
      return(
        <MainApp />
      )
    }
  }
}
