import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const MainButton = props => {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'relative'
  },
  text: {
  	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	fontSize: 40,
  	fontWeight: 'bold',
  	color: '#000',
  	transform: [
  		{
  			translateX: -14
  		},
  		{
  			translateY: -25
  		}
  	]
  }
});

export default MainButton;