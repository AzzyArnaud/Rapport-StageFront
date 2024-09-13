import { configureStore, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
// import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";
import languageReducer from "./reducers/languageReducer";

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: () => false,
});

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;