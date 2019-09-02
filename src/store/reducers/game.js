import * as actionTypes from '../actions/actionTypes';
import { updateGame } from '../../logic/updateGame';
import { SQLite } from 'expo-sqlite';
import {insertScore, fetchScores, prune} from '../../helpers/db';

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
};

const deleteEleventhScore = (scores) => {
  if(scores.length >= 9){
    let scoresCopy = scores.map((score) => {
      return score;
    });
    let unsorted = scores.map((score) => {
      return score.score;
    });
    let sorted = [];

    for(let i=0; i<9; i++){
      let HighestScoreIndex = unsorted.indexOf(Math.max(...unsorted))
      sorted.push(scoresCopy[HighestScoreIndex]);
      unsorted.splice(HighestScoreIndex, 1);
      scoresCopy.splice(HighestScoreIndex, 1);
    }
    
    scoresCopy.map((score) => {
      fetch(`https://api.programmermax.com/tetris-mobile/${score._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heC5vcHBvcjFAZ21haWwuY29tIiwiaWQiOiI1ZDM0ZTE2NGNkMDBkMWFjYWJhYzU2ODEiLCJpYXQiOjE1NjM4MTA1OTksImV4cCI6MTU2MzgxNDE5OX0.YaOX4kySNKSUqKccgZbboVLljB9Fi8jFFteQr9Fr0A8'
        }
      });
      return null;
    });
  }
};

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
    paused: false,
    quit: false
  }
}

const initialState = {
  ...newGame(),
  scores: [],
  page: "menu",
  selector: 0,
  leaderBoard: false,
  isHighScoreLocal: false,
  isHighScoreRemote: false,
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
    case actionTypes.QUIT:
      return {...state, quit: !state.quit};
    case actionTypes.CONFIRM_QUIT:
      return {
        ...state,
        lost: true
      }
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
        isHighScoreLocal: isHighScore(state.score, s),
        isHighScoreRemote: isHighScore(state.score, state.scores.map(s => s.score))
      };
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    case actionTypes.INSERT_SCORE:
      insertScore(state.name, state.score);
      prune();
      if(state.isHighScoreRemote){
        fetch('https://api.programmermax.com/tetris-mobile', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: state.name,
            score: state.score
          })
        });
        deleteEleventhScore(state.scores);
      }
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