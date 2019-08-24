import * as actionTypes from '../actions/actionTypes';
import { updateGame } from '../../logic/updateGame';
import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("tetrisScores");

const newGame = () => {
  return {
    board: [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]],
    pieces: [],
    step: 15,
    input: null,
    level: 0,
    score: 0,
    lines: 0,
    lost: false,
    paused: false
  }
}

const initialState = {
  ...newGame(),
  scores: [],
  page: "menu",
  selector: 0,
  leaderBoard: false
}

const game = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.START_GAME:
      return {
        ...state,
        ...newGame(),
        scores: state.scores,
        page: "game"
      }
    case actionTypes.UPDATE:
      const newState = updateGame(state);
      return {
        ...state,
        pieces: newState.pieces,
        board: newState.board,
        score: newState.score,
        lines: newState.lines,
        level: newState.level,
        lost: newState.lost,
        input: null
      };
    case actionTypes.SET_INPUT:
      return {
        ...state,
        input: action.input
      };
    case actionTypes.NAVIGATE:
      return {
        ...state,
        page: action.page,
        selector: 0
      };
    case actionTypes.SET_SCORES:
      const scores = action.scores;
      return {
        ...state,
        scores: scores
      };
    case actionTypes.PAUSE:
      return {...state, paused: !state.paused};
    case actionTypes.SELECT_UP:
      let selector = null;
      if(state.selector === 0){
        selector = action.length - 1;
      } else {
        selector = state.selector - 1;
      }
      return {
        ...state,
        selector: selector
      };
    case actionTypes.SELECT_DOWN:
      if(state.selector === action.length - 1){
        selector = 0;
      } else {
        selector = state.selector + 1;
      }
      return {
        ...state,
        selector: selector
      };
    case actionTypes.LEADER_BOARD:
      return {
        ...state,
        leaderBoard: !state.leaderBoard
      };
    case actionTypes.SAVE_SCORE:
      db.transaction(tx => {
        tx.executeSql(
          `select * from tetrisScores;`,
          [],
          (_, res) => alert(res)
        ),
        () => alert('ere'),
        () => alert('here')
      });
      return state;
    default:
      return state;
  }
};

export default game;