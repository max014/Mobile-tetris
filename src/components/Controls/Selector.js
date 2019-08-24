import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

const Selector = props => {
	return (
		<View>
			{props.options.map((child, i) => (
				<View key={i} style={[i === props.index ? styles.active : null, styles.all]}>
					<Text style={i === props.index ? styles.activeText : null}>{child.title}</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	all: {
		padding: 4
	},
	active: {
		backgroundColor: "#333"
	},
	activeText: {
		color: '#fff'
	}
})

const mapStateToProps = state => {
	return {
		index: state.game.selector
	}
}

export default connect(mapStateToProps)(Selector);