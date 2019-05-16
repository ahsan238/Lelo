import React from "react";
import styles from "./style";
import { Icon } from 'expo';
import {
  ActivityIndicator,
  Image,
  Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback,
  Platform, 
  Alert, 
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Card,
  CardItem,
  Body
} from "native-base";
import { Header,Button } from 'react-native-elements';
import firebase from 'firebase';

export default class ProductScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			seller: '',
			isLoading: true,
		};
	}

	componentDidMount (){
		const { product } = this.props.navigation.state.params;
		console.log(product)

		let userId = product.uid
		firebase.database().ref('users/'+ userId).once('value', function (snapshot) {
      const user = snapshot.val();
      this.setState({
				seller: user.name,
				isLoading: false
			})
    }.bind(this));
	}

  renderImage(image){
    if(!image){
      return (
        <Image
          source={require('../../assets/images/no-image.png')}
          style={styles.img}
        />
      )
    } else {
      return (
        <Image
          source={{ uri: image }}
          style={styles.img}
        />
      )
    }
  }

	render() {
    const { product } = this.props.navigation.state.params;
    if (this.state.isLoading) {
      return(
        <View>
          <Header
            leftComponent={
              <Button 
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    color={'white'}
                    size={26}
                  />
                }
              />
            }
            centerComponent={{ text: 'Product',size: 26,style: { color: '#fff' } }}
          />
          {this._renderUploadingOverlay()}
        </View>
      )
    } else {
      return (
        <View>
          <View>
            <Header
              leftComponent={
              <Button 
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    color={'white'}
                    size={26}
                  />
                }
              />}
              centerComponent={{ text: 'Product',size: 26,style: { color: '#fff' } }}
            />
          </View>
          <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
              {this.renderImage(product.image)}
              <Card style={styles.detailsCard}>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.userName}>{this.state.seller}</Text>
                      <Button
                        title="VIEW PROFILE"
                        type="clear"
                        onPress={() => {
					                this.props.navigation.navigate("Profile", {product: product})
					                }
					              }
                      />
                    </View>
                    <Text style={styles.price}>Price: Rs {product.price}</Text>
                    <Text style={styles.description}>
                      Description: {product.description}
                    </Text>
                    <Text style={styles.category}>
                      Category: {product.category}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>
          </View>
        </View>
      )
    }	  
  }

  _renderUploadingOverlay = () => {
    return (
      <View
        style={styles.loading}>
        <ActivityIndicator color="#fff" animating size="large" />
      </View>
    );
  }
  
}

