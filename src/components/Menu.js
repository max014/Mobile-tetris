import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Controls from './Controls/';
import Selector from './Controls/Selector';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import {fetchScores} from '../helpers/db';

const Menu = props => {
	const [localScores, setLocalScores] = useState([]);
	

	useEffect(() => {
		fetch('https://api.programmermax.com/tetris', {
			method: "GET",
		}).then(res => res.json())
		  .then(data => props.setScores(data));
		fetchScores().then((scores) => {
			const s = scores.rows._array.map(score => {
				return {name: score.name, score: score.score};
			});
			setLocalScores(s);
		});
	}, []);

	const scores = props.leaderBoard ? props.scores : localScores;
	
	return (
		<View style={styles.container}>
			<Selector options={[
				{title: 'New Game'},
				{title: props.leaderBoard ? "Your High Scores" : 'World High Scores'}
				]}/>
			<View style={styles.scores}>
				{scores.map((score, i) => (
					<View key={i} style={styles.score}>
						<Text style={styles.text}>{score.name}</Text>
						<Text style={styles.text}>{score.score}</Text>
					</View>
				))}
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	scores: {
		backgroundColor: "#333",
		padding: 10
	},
	score: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		color: '#fff'
	}
});

const mapStateToProps = state => {
	return {
		leaderBoard: state.game.leaderBoard,
		scores: state.game.scores
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setScores: (scores) => dispatch({type: actionTypes.SET_SCORES, scores: scores})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);