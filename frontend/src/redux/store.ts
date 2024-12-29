import ProductReducer from '@/redux/index';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const rootReducer = combineReducers({
     product:ProductReducer
})

const persistConfig = {
     key: "root",
     storage,
     whitelist:['product']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }),
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;  
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistedStore, useAppDispatch, useAppSelector };
