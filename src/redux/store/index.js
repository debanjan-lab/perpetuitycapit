import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/index';
import thunk from "redux-thunk";
const Store = createStore(reducers, applyMiddleware(thunk))
export default Store;

