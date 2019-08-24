import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const SecondaryButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={props.action} style={styles.button}/>
      <Text>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  },
  button: {
    backgroundColor: '#222',
    height: 15,
    width: 40,
    borderRadius: 30
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

export default SecondaryButton;