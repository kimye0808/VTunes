//루트 리듀서 만들기
import {combineReducers} from 'redux';
import musicController from './musicController';

const rootReducer = combineReducers({
  musicController
});

export default rootReducer;