import {createStore} from 'redux'
import {composedWithDevTools} from "redux-devtools-extension"
import rootReducer from "./reducers/rootReducer"

const store = createStore(rootReducer, composedWithDevTools)

export default store;