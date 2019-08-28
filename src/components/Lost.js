import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import Selector from './Controls/Selector';

const Lost = props => {
	return (
		<View style={styles.container}>
			<Text>Game Over</Text>
			<Text>Your Score: {props.score}</Text>
			{props.isHighScore ? 
				<View>
					<TextInput onChangeText={(e) => props.setName(e)} style={styles.input}/>
					<Selector options={[
						{title: 'Save'},
						{title: 'Main Menu'}]}/>
				</View> : 
				<Selector options={[
					{title: 'New Game'},
					{title: 'Main Menu'}]}/>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	input: {
		backgroundColor: '#fff',
		width: 100
	}
});

const mapStateToProps = state => {
	return {
		score: state.game.score,
		isHighScore: state.game.isHighScore
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setName: (name) => dispatch({type: actionTypes.SET_NAME, name: name})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Lost);