import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Selector from './Controls/Selector';

const Quit = props => {
	if(props.quit){
		return (
			<View style={styles.quit}>
				<Text style={styles.text}>Quit Game?</Text>
				<Selector options={[
					{title: 'Yes'},
					{title: 'No'}]}/>
			</View>
		)
	} else {
		return null;
	}
};

const styles = StyleSheet.create({
	quit: {
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
    quit: state.game.quit
  }
}

export default connect(mapStateToProps)(Quit);