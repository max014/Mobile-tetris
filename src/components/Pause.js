import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const Pause = props => {
	if(props.paused){
		return (
			<View style={styles.pause}>
				<Text style={styles.text}>Paused</Text>
			</View>
		)
	} else {
		return null;
	}
};

const styles = StyleSheet.create({
	pause: {
		position: 'absolute',
		top: '35%',
		left: '38%',
		backgroundColor: '#333',
		padding: 15,
		borderRadius: 5
	},
	text: {
		color: "#fff"
	}
});

const mapStateToProps = state => {
  return {
    paused: state.game.paused
  }
}

export default connect(mapStateToProps)(Pause);