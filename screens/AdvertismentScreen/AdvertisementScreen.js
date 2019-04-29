import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator, Alert} from 'react-native';
import {form, struct, String, Boolean, maybe} from 'tcomb-form-native'
import firebase from 'firebase'
import Thankyou from './Thankyou'

const Form = form.Form

const recipe = struct({
  productName: String,
  price: String,
  owner: String,
})

export default class Advertisment extends Component{

  constructor(props){
    super(props)

    this.state = {
      uploading: false,
      value:{
        productName: '',
        price: '',
        owner: '',
      },
      uploadView: true,
    }

    this.renderLoader = this.renderLoader.bind(this)
    this.uploadRecipe = this.uploadRecipe.bind(this)
    this.changeToAddRecipeView = this.changeToAddRecipeView.bind(this)
    this.renderView = this.renderView.bind(this)


  }

  renderLoader(){
    if(this.state.uploading){
      return(
        <ActivityIndicator/>
      )
    } else {
      return(
        <TouchableHighlight style={styles.button} onPress={this.uploadRecipe} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableHighlight>
      )
    }
  }

  uploadRecipe(){
    this.setState({uploading: true})
    const { productName, price, owner} = this.state.value;
    if(productName === '' || price === '' || owner === ''){
      Alert.alert(
        'Error',
        'Please check the details again.',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
    );
    this.setState({uploading:false})
  } else {
      const key = firebase.database().ref().push().key;
      firebase.database().ref("products/"+key).set({
        productName,
        price,
        owner,
      })
      this.setState({ value: {
        productName: '',
        price: '',
        owner: '',
      }, uploading: false, uploadView: false})
    }

  }

  changeToAddRecipeView(){
    this.setState({uploadView: true})
  }

  renderView(){
    if(this.state.uploadView){
      return(
        <ScrollView style={styles.container}>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={this.uploadImage}>
            <Image
                style={styles.profilePic}
                resizeMode='cover'
                source={require('../../assets/images/robot-prod.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Form
            ref="form"
            type={recipe}
            value={this.state.value}
            onChange={(value) => this.setState({value})}
          />
          {this.renderLoader()}
        </View>
        </ScrollView>
      )
    } else {
      return(
          <Thankyou changeView={this.changeToAddRecipeView}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageContainer:{
    alignItems: 'center',
    marginTop: 60,
  },
  profilePic:{
    paddingVertical: 30,
    width: 100,
    height: 100,
    borderRadius: 37.5
  },
  formContainer:{
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
