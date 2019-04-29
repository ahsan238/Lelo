import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class Thankyou extends Component{

  constructor(props){
    super(props)

    this.addAgain = this.addAgain.bind(this)

  }

  addAgain(){
    this.props.changeView();
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Thank you</Text>
          </View>
          <Lottie
            autoPlay
            loop
            source={require('../../assets/animations/thank_you.json')}
            style={{flex:4}}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.addAgain}>
              <Text style={{fontSize: 18, color: 'white'}}>Your product has been posted</Text>
            </TouchableOpacity>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headingContainer:{
    alignItems: 'center',
    paddingTop: 80,
  },
  heading:{
    fontSize: 40,
    color: '#D41000',
    fontFamily: 'Palatino-BoldItalic'
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 70,
  },
  button:{
    backgroundColor: '#FF4A31',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5
  },

});
