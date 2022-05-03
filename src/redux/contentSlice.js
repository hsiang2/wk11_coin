import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMarketData, getDetailedCoinData, getCoinMarketChart, getCandleChartData } from "../api"

const getMarketAsync = createAsyncThunk(
    'content/getMarket',
    async () => {
        const { data } = await getMarketData();
        return data;
    }
);

const getDetailedCoinAsync = createAsyncThunk(
    'content/getDetailedCoin',
    async (coinId) => {
        const { data } = await getDetailedCoinData(coinId);
        return data;
    }
);

const getCoinMarketChartAsync = createAsyncThunk(
    'content/getCoinMarket',
    async (coin) => {
        const { data } = await getCoinMarketChart(coin.id, coin.range);
        return data;
    }
)

const getCandleChartAsync = createAsyncThunk(
    'content/getCandleChart',
    async (coin) => {
        const { data } = await getCandleChartData(coin.id, coin.range);
        return data;
    }
)

const initialState = {
    marketData: [],
    detailedCoinData: null,
    coinMarketChart: [],
    candleChartData: [],
    //status: 'idle'
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getMarketAsync.fulfilled, (state, action) => {
            state.marketData = action.payload;
        })
        .addCase(getDetailedCoinAsync.fulfilled, (state, action) => {
            state.detailedCoinData = action.payload;
        })
        .addCase(getCoinMarketChartAsync.fulfilled, (state, action) =>{
            state.coinMarketChart = action.payload;
        })
        .addCase(getCandleChartAsync.fulfilled, (state, action) => {
            state.candleChartData = action.payload;
        })
    }
});

export const selectMarketData = (state) => state.content.marketData;
export const selelectDetailedCoinData = (state) => state.content.detailedCoinData;
export const selectCoinMarketChart = (state) => state.content.coinMarketChart;
export const selectCandleChartData = (state) => state.content.candleChartData;

export { getMarketAsync, getDetailedCoinAsync, getCoinMarketChartAsync, getCandleChartAsync };

export default contentSlice.reducer;