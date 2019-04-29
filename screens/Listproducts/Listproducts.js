
import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableHighlight, ListView, RefreshControl} from 'react-native';
import firebase from 'firebase'
import Item from "./Item"
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import { SearchBar } from 'react-native-elements'
import { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['productName'];

export default class Listproducts extends Component{

  constructor(props){
    super(props)

    this.state = {
      loadingData: true,
      data: null,
      search: '',
      refreshing: false
    }
    this.arrayholder = [];

    this.renderView = this.renderView.bind(this)
    this.fetchData = this.fetchData.bind(this)

  }

  updateSearch = search => {
    this.setState({ search });
  };


  fetchData (){
    firebase.database().ref("products/").once('value').then(snapshot => {
      let data = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}))//.filter(recipe => recipe.mainIngredient === 'carrot' || 'chocolate')
      this.setState({data, loadingData: false})
    })
  }

  componentWillMount(){
    this.fetchData()
  }

  renderView(){
    const {search} = this.state;
    if(this.state.loadingData){
      return(
        <TouchableHighlight style={styles.button} onPress={this.fetchData} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Fetch Products</Text>
        </TouchableHighlight>
       )
    } else {
      // let recipes = this.state.data
      let recipes = this.state.data.filter(createFilter(this.state.search,KEYS_TO_FILTERS))
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
      })
      this.dataSource = ds.cloneWithRows(recipes);
      return (
          <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} style={styles.scrollContainer} /> }>
            <SearchBar
              lightTheme
              round
              containerStyle={{backgroundColor: '#F5FCFF', marginBottom: 10 }}
              searchIcon={{ size: 24 }}
              onClearText={() => this.setState({search:''})}
              placeholder='Search your product'
              inputStyle={{color: 'black'}}
              // onChangeText={(search) =>  this.setState({search}) }
              onChangeText={this.updateSearch}
              value = {search}
            />
            <ListView style={styles.scrollContainer}
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={ (rowData) => <Item recipeData={rowData} /> }

            />
          </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.container} >
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
  headingContainer:{
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  heading:{
    fontSize: 40,
    color: '#D41000',
    fontFamily: 'Palatino-BoldItalic'
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
  },
  scrollContainer: {
    paddingTop: 45
  }

});
