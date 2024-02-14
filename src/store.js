import { combineReducers, configureStore } from "@reduxjs/toolkit";

import selectionRowReducer from "./stores/checkRowData";

const rootReducer = combineReducers({
  selectionRow: selectionRowReducer,
});

export default configureStore({
  reducer: rootReducer,
});
