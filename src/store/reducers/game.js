import * as actionTypes from '../actions/actionTypes';
import { updateGame } from '../../logic/updateGame';
import { SQLite } from 'expo-sqlite';
import {insertScore, fetchScores} from '../../helpers/db';

const db = SQLite.openDatabase("tetrisScores");

const isHighScore = (score, scores) => {
  if(score === 0){ return false };
  let highScores = [];

  for(let i=0; i<10; i++){
    highScores.push(Math.max(...scores));
    scores.splice(scores.indexOf(Math.max(...scores)), 1);
  }

  if(score > Math.min(...highScores)){
    return true;
  } else {
    return false;
  }
}

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
  leaderBoard: false,
  isHighScore: false,
  name: ""
}

const game = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.START_GAME:
      return {
        ...newGame(),
        scores: state.scores,
        page: "game",
        selector: 0,
        leaderBoard: false
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
    case actionTypes.END:
      let s = [];
      fetchScores().then((scores) => {
        s = scores.rows._array.map(score => score.score);
      });
      return {
        ...state,
        page: "lost",
        selector: 0,
        isHighScore: isHighScore(state.score, s)
      };
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    case actionTypes.INSERT_SCORE:
      insertScore(state.name, state.score);
      return {
        ...state,
        page: "menu",
        selector: 0,
        name: ""
      };
    default:
      return state;
  }
};

export default game;