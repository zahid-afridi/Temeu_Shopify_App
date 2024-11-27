import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import reducer from "./reducer";

// Configure Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage,     // Storage method (localStorage in this case)
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Enhance store with middleware
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// Create store with persisted reducer
export const store = createStore(persistedReducer, composedEnhancer);

// Create the persistor
export const persistor = persistStore(store);
