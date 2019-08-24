import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

const Level = props => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Level:</Text>
        <Text style={styles.text}>{props.level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    margin: 5,
    padding: 3,
    borderRadius: 4,
    justifyContent: "space-between",
  },
  text: {
    color: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    level: state.game.level
  }
};

export default connect(mapStateToProps)(Level);