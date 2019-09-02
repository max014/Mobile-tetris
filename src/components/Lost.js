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
			{props.isHighScoreLocal || props.isHighScoreRemote ? 
				<View style={{width: 140}}>
					<Text style={styles.enter}>Enter Your Name</Text>
					<TextInput
						autoFocus
						onSubmitEditing={props.insertScore}
						onChangeText={(e) => props.setName(e)}
						style={styles.input}/>
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
		width: "100%",
		marginTop: 10,
		marginBottom: 10
	},
	enter: {
		marginTop: 10,
		fontSize: 18,
		textAlign: 'center'
	}
});

const mapStateToProps = state => {
	return {
		score: state.game.score,
		isHighScoreLocal: state.game.isHighScoreLocal,
		isHighScoreRemote: state.game.isHighScoreRemote
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setName: (name) => dispatch({type: actionTypes.SET_NAME, name: name}),
		insertScore: () => dispatch({type: actionTypes.INSERT_SCORE})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Lost);