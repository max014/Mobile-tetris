import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

const Score = props => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Score:</Text>
        <Text style={styles.text}>{props.score}</Text>
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
    score: state.game.score
  }
};

export default connect(mapStateToProps)(Score);