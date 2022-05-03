import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from './contentSlice';
import selectedRangeReducer from './selectedRangeSlice';
import loadingReducer, { selectLoading } from './loadingSlice';
import { exp } from "react-native-reanimated";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const store = configureStore({
    reducer: {
        content: persistReducer(persistConfig, contentReducer),
        selectedRange: selectedRangeReducer,
        loading: loadingReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;

persistStore(store);