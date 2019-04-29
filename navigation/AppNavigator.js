import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen/index';
import SignupScreen from '../screens/SignupScreen/index';
import EditProfileScreen from '../screens/EditProfileScreen/index';
export default createAppContainer(createSwitchNavigator(
	{
		Login: {screen: LoginScreen},
		Signup: {screen: SignupScreen},
		Main: {screen: MainTabNavigator},
		EditProfile: {screen: EditProfileScreen},
	},
	{
		initialRouteName: "Login",
		headerMode: "none"
	}
));