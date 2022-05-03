import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedRange: "1"
};

const selectedRangeSlice = createSlice({
    name: 'selectedRange',
    initialState,
    reducers: {
        setSelectedRange: (state, action) => {
            state.selectedRange = action.payload;
        }
    }
});

export const selectSelectedRange = (state) => state.selectedRange.selectedRange;

export const { setSelectedRange } = selectedRangeSlice.actions;

export default selectedRangeSlice.reducer;