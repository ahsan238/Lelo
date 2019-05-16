const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {
	
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 100,
    height: 100
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginRight: width * 0.20,
    marginLeft: width * 0.20
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
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
};
