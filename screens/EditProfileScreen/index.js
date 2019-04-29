import React, { Component } from "react";
import styles from "./style";
import {Image,Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Header,Icon,Button } from 'react-native-elements';
import firebase from 'firebase';

export default class EditProfileScreen extends Component {

  constructor(props){
    super(props)
    console.disableYellowBox = true;
    this.state = {
      name: '',
      phone: '',
      address: '',
    }
    this.onSavePress = this.onSavePress.bind(this)
  }
  
  onSavePress(name,phone,address) {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).update({
      name: name,
      phone: phone,
      address: address,
     }).then(function(value){
      alert('Changes Saved!');
     }).catch(function(error){
      alert(error.toString());
     });
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
                  this.props.navigation.navigate("Profile");
                }}
                icon={
                  <Icon
                    name="arrow-back"
                    size={26}
                    color="white"
                  />
                }
              />}
              centerComponent={{ text: 'Edit Profile',size: 26,style: { color: '#fff' } }}
            />
            <View style={styles.signupFormView}>
              <TextInput placeholder="Full Name" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(name) => this.setState({name})} value={this.state.name}/>
              <TextInput placeholder="Phone Number" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(phone) => this.setState({phone})} value={this.state.phone}/>
              <TextInput placeholder="Address" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(address) => this.setState({address})} value={this.state.address}/>
              <Button
                buttonStyle={styles.signupButton} 
                onPress={() => {this.onSavePress( this.state.name,this.state.phone,this.state.address);}}
                title="Save Changes"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}