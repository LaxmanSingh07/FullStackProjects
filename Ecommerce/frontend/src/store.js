import   {applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer,productDetailsReducer } from "./reducers/productReducer";
const reducer = combineReducers({
  product: productReducer,
  productDetails:productDetailsReducer
});

let initialState = {};
const middleware = [thunk]; // it is used to make async request
const store = createStore(
  reducer,
  initialState, // it is the initial state of the store
  composeWithDevTools(applyMiddleware(...middleware)) // it is used to make the store visible in the redux dev tools
);

export default store;
