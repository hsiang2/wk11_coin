import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCandleChartVisible: false
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setIsCandleChartVisible: (state) => {
            state.isCandleChartVisible = !state.isCandleChartVisible;
        }
    }
});

export const selectIsCandleChartVisible = (state) => state.chart.isCandleChartVisible;
export const { setIsCandleChartVisible } = chartSlice.actions;
export default chartSlice.reducer;