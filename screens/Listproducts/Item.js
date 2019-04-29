import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
// import {Octicons} from 'expo/vector-icons'


export default class Item extends Component{

    constructor(props){
        super(props)
    }


    render() {
        return (
        <View>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.recipeName}>{this.props.recipeData.productName}</Text>
                        <Text style={styles.recipeName}>{this.props.recipeData.price}</Text>
                    </View>
                    <View style={styles.authorContainer}>
                        <Text style={styles.author}>{this.props.recipeData.owner}</Text>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imageStyle}
                        resizeMode='cover'
                        source={require('../../assets/images/robot-prod.png')}
                    />
                </View>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer:{
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    },
    nameContainer:{
        marginBottom: 8,
    },
    recipeName:{
        fontSize: 20,
        fontFamily: 'Chalkduster',
        color: '#2F8EFF'
    },
    authorContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    author:{
        fontSize: 15,
        fontFamily: 'Chalkduster',
        color: '#2F8EFF',
        marginRight: 10,
    },
    imageStyle:{
        paddingVertical: 30,
        width: 75,
        height: 75,
        borderRadius: 37.5
    }
});
