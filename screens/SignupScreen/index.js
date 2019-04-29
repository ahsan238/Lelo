import React, { Component } from "react";
import styles from "./style";
import {Image,Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Header,Icon,Button } from 'react-native-elements';
import firebase from 'firebase';

export default class LoginScreen extends Component {

  constructor(props){
    super(props)
    console.disableYellowBox = true;
    this.state = {
      email: '',
      password: '',
      confPassword: '',
      name: '',
      phone: '',
      address: '',
    }
    this.onSignupPress = this.onSignupPress.bind(this)
  }
  
  onSignupPress(email,password,name,phone,address) {
    if(email !== '' && password !== '' && email.includes('@lums.edu.pk') && password.length >= 6) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(value){
        console.log('user created')
      })
      .then(function(value){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            var user_id = user.uid;    
            console.log(user_id,name,email,phone,address);
            firebase.database().ref('users/' + user_id).set({
              name: name,
              email: email,
              phone : phone,
              address : address
            }).then(()=> {
                alert('Account created');
            }).catch((error)=>{
                alert(error.toString());
            });
          } else {
            console.log('no user signed in')
          } 
        });
      })
      .catch(function(error) {
        alert(error.toString());
      });
    } else {
      Alert.alert(
        'Email Error / Password Length ',
        'You should have a lums email to create an account OR the password length should be greater than 6 characters',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.signupScreenContainer}>
            <Header
              leftComponent={
              <Button 
                onPress={() => {
                  console.log('Back clicked');
                  this.props.navigation.navigate("Login");
                }}
                icon={
                  <Icon
                    name="arrow-back"
                    size={26}
                    color="white"
                  />
                }
              />}
              centerComponent={{ text: 'Sign Up',size: 26,style: { color: '#fff' } }}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
              <Image
                source={require('../../assets/images/LOGO.png')}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.signupFormView}>
              <TextInput placeholder="Lums Email" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
              <TextInput placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} onChangeText={(confPassword) => this.setState({confPassword})} value={this.state.confPassword}/>
              <TextInput placeholder="Full Name" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(name) => this.setState({name})} value={this.state.name}/>
              <TextInput placeholder="Phone Number" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(phone) => this.setState({phone})} value={this.state.phone}/>
              <TextInput placeholder="Address" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(address) => this.setState({address})} value={this.state.address}/>
              <Button
                buttonStyle={styles.signupButton} 
                onPress={() => {
                  if (this.state.password != this.state.confPassword){
                    alert("Passwords do not match");
                  }
                  else {
                    this.onSignupPress(this.state.email,this.state.password,this.state.name,this.state.phone,this.state.address);
                  }
                }}
                title="SignUp"
              />
              <Text
                style={styles.signupFormText}
              >
                By continuing, you agree to our Terms and Conditions
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}