import {combineReducers} from 'redux'
import cardReducer from './cardReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer
})

export default rootReducer;