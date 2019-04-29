const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
    name: {
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
    email: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  address: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  phone: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
};