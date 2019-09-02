import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MainButton from './MainButton';
import SecondaryButton from './SecondaryButton';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

let timer = null;

const Controls = props => {
  const b = () => {
    buttons.b();
    timer = setTimeout(b, 200);
  }

  const a = () => {
    buttons.a();
    timer = setTimeout(a, 200);
  }

  const up = () => {
    buttons.up();
    timer = setTimeout(up, 100);
  }

  const down = () => {
    buttons.down();
    timer = setTimeout(down, 100);
  }

  const left = () => {
    buttons.left();
    timer = setTimeout(left, 150);
  }

  const right = () => {
    buttons.right();
    timer = setTimeout(right, 150);
  }

  const stopTimer = () => {
    clearTimeout(timer);
  }

  const menuSelect =  {
    0: props.startGame,
    1: props.switchLeaderBoard
  }

  const lostSelect =  {
    0: props.isHighScoreLocal ? props.insertScore : props.startGame,
    1: props.menu
  }

  const quitSelect = {
    0: props.confrimQuit,
    1: props.quit
  }

  let buttons = {};

  useEffect(() => {
    if(props.page === 'menu'){
      buttons = {
        up: () => props.selectUp(2), // length of options array
        down: () => props.selectDown(2), // length of options array
        left: () => null,
        right: () => null,
        start: props.startGame,
        select: () => null,
        a: menuSelect[props.selector],
        b: () => null
      };
    } else if(props.page === 'game') {
      if(props.selectOpen){
        buttons = {
          up: () => props.selectUp(2),
          down: () => props.selectDown(2),
          left: () => null,
          right: () => null,
          start: quitSelect[props.selector],
          select: props.quit,
          a: quitSelect[props.selector],
          b: () => null
        };
      } else {
        buttons = {
          up: () => null,
          down: () => props.setInput(40),
          left: () => props.setInput(37),
          right: () => props.setInput(39),
          start: props.pause,
          select: props.quit,
          a: () => props.setInput(68),
          b: () => props.setInput(83)
        };
      };
    } else if(props.page === 'lost') {
      buttons = {
        up: () => props.selectUp(2), // length of options array
        down: () => props.selectDown(2), // length of options array
        left: () => null,
        right: () => null,
        start: props.menu,
        select: () => null,
        a: lostSelect[props.selector],
        b: () => null
      };
    };
  }, [props.page, props.selector, props.selectOpen]);

  return (
    <View style={styles.controls}>
      <View style={styles.DPad}>
        <View style={styles.row}>
          <TouchableOpacity onPressIn={up} onPressOut={stopTimer} style={styles.block}/>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPressIn={left} onPressOut={stopTimer} style={styles.block}/>
          <View style={styles.block}/>
          <TouchableOpacity onPressIn={right} onPressOut={stopTimer} style={styles.block}/>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPressIn={down} onPressOut={stopTimer} style={styles.block}/>
        </View>
      </View>
      <View style={styles.BButton}>
        <TouchableOpacity onPressIn={b} onPressOut={stopTimer}>
          <MainButton>B</MainButton>
        </TouchableOpacity>
      </View>
      <View style={styles.AButton}>
        <TouchableOpacity onPressIn={a} onPressOut={stopTimer}>
          <MainButton>A</MainButton>
        </TouchableOpacity>
      </View>
      <View style={styles.select}>
        <SecondaryButton action={() => buttons.select()}>SELECT</SecondaryButton>
      </View>
      <View style={styles.start}>
        <SecondaryButton action={() => buttons.start()}>START</SecondaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 330,
    flex: 1
  },
  DPad: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  BButton: {
    position: 'absolute',
    right: 80,
    top: 40
  },
  AButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  select: {
    position: 'absolute',
    left: 110,
    bottom: 0
  },
  start: {
    position: 'absolute',
    right: 110,
    bottom: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  block: {
    backgroundColor: '#222',
    width: 35,
    height: 35
  }
});

const mapStateToProps = state => {
  return {
    page: state.game.page,
    selector: state.game.selector,
    isHighScoreLocal: state.game.isHighScoreLocal,
    isHighScoreRemote: state.game.isHighScoreRemote,
    selectOpen: state.game.quit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInput: (input) => dispatch({type: actionTypes.SET_INPUT, input: input}),
    startGame: () => dispatch({type: actionTypes.START_GAME}),
    pause: () => dispatch({type: actionTypes.PAUSE}),
    quit: () => dispatch({type: actionTypes.QUIT}),
    confrimQuit: () => dispatch({type: actionTypes.CONFIRM_QUIT}),
    menu: () => dispatch({type: actionTypes.NAVIGATE, page: "menu"}),
    selectUp: (length) => dispatch({type: actionTypes.SELECT_UP, length: length}),
    selectDown: (length) => dispatch({type: actionTypes.SELECT_DOWN, length: length}),
    switchLeaderBoard: () => dispatch({type: actionTypes.LEADER_BOARD}),
    insertScore: () => dispatch({type: actionTypes.INSERT_SCORE})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);