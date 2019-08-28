import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import * as actionTypes from '../store/actions/actionTypes';
import {View, StyleSheet} from 'react-native';

class Display extends Component {
	state = {
		time: Date.now()
	}

	componentDidMount() {
		// Game Loop
		this.interval = setInterval(() => {
			if(!this.props.paused && !this.props.quit){
				this.props.update();
			}
			this.setState({ time: Date.now()});
			// if game ends
			if(this.props.lost){
				clearInterval(this.interval);
				this.props.end();
			}
		}, this.props.refreshRate);
	}

	render() {
		const board = this.props.board.map((row, y) => {
			return row.map((color, x) => {
				if (color !== 0){
					return (<Block x={x} y={y} color={color} key={x.toString() + "-" + y.toString()} />)
				}
				return null;
			})
		});

		return (
			<View style={styles.Display}>
				{board}
			</View>
		);

	}
}

const styles = StyleSheet.create({
	Display: {
		position: "relative",
		height: "100%",
		width: 150,
		backgroundColor: '#fff'
	}
});

const mapStateToProps = state => {
    return {
        board: state.game.board,
        height: state.game.height,
        step: state.game.step,
        lost: state.game.lost,
        paused: state.game.paused,
        quit: state.game.quit
    };
}

const mapDispatchToProps = dispatch => {
    return {
        update: () => dispatch({type: actionTypes.UPDATE}),
        setInput: (input) => dispatch({type: actionTypes.SET_INPUT, input: input}),
        end: () => dispatch({type: actionTypes.END})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);