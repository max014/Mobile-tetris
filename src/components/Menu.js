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
		fetch('https://api.programmermax.com/tetris-mobile', {
			method: "GET",
		}).then(res => res.json())
		  .then(data => {

		  	let scoresCopy = data.map((score) => {
		      return score;
		    });
		    let unsorted = data.map((score) => {
		      return score.score;
		    });
		    let sorted = [];

		    for(let i=0; i<data.length; i++){
		      let HighestScoreIndex = unsorted.indexOf(Math.max(...unsorted))
		      sorted.push(scoresCopy[HighestScoreIndex]);
		      unsorted.splice(HighestScoreIndex, 1);
		      scoresCopy.splice(HighestScoreIndex, 1);
		    }

		  	props.setScores(sorted)
		  });
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
		width: 200,
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