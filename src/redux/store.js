import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from './contentSlice';
import selectedRangeReducer from './selectedRangeSlice';
import loadingReducer from './loadingSlice';
import chartReducer from './chartSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const store = configureStore({
    reducer: {
        content: persistReducer(persistConfig, contentReducer),
        selectedRange: selectedRangeReducer,
        loading: loadingReducer,
        chart: chartReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;

persistStore(store);