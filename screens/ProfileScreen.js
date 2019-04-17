import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import LoginScreen from './ProfileScreens/LoginScreen';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return <LoginScreen/>;
  }
}
