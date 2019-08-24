import React from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet} from 'react-native';
import colorPallets from '../colorPallets';

const Block = props => {
  const inlineStyles = {
    width: props.step, 
    height: props.step,
    bottom: props.y * props.step,
    left: props.x * props.step,
    backgroundColor: colorPallets[props.level][props.color]
  };

  return (
    <View style={[inlineStyles, styles.Block]}>
      <View style={styles.Inner}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Block: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#000"
  },
  Inner: {
    position: "absolute",
    top: 2.5,
    left: 2.5,
    height: "60%",
    width: "60%",
    opacity: .2,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => {
    return {
        step: state.game.step,
        level: state.game.level
    };
}

export default connect(mapStateToProps)(Block);