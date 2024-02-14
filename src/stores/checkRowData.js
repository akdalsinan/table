import { createSlice } from "@reduxjs/toolkit";

export const selection = createSlice({
  name: "selection",
  initialState: { value: [] },
  reducers: {
    rowSelection: (state, action) => {
      state.value = action.payload.selectedCheckboxes;
    },
  },
});

export const { rowSelection } = selection.actions;
export default selection.reducer;
