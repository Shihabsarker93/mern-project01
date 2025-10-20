// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// //admin 1
// import adminReducer from './admin/adminSlice';


// const rootReducer = combineReducers({ user: userReducer });
// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// }
// //admin 17-20

// const rootReducer = combineReducers({ 
//   user: userReducer,
//   admin: adminReducer 
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userSlice';
import adminReducer from './admin/adminSlice';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks for redux-persist
    }),
});

// Persistor for persisting store
export const persistor = persistStore(store);
