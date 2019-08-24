import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import Selector from './Controls/Selector';

const Lost = props => (
	<View style={styles.container}>
		<Text>Game Over</Text>
		<Text>Your Score: {props.score}</Text>
		<Selector options={[
			{title: 'New Game', action: actionTypes.START_GAME},
			{title: 'Main Menu', action: actionTypes.MENU}
			]}/>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 10
	}
});

const mapStateToProps = state => {
	return {
		score: state.game.score
	}
};

const mapDispatchToProps = dispatch => {
	return {
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Lost);