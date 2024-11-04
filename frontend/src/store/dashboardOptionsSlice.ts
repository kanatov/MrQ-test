import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  activeSymbol: string | null;
  showCardInfo: boolean;
}

const initialState: StoreState = {
  activeSymbol: '',
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    setSelectedCard: (state, action: PayloadAction<string | null>) => {
      state.activeSymbol = action.payload;
    }
  }
});

export const { toggleShowCardInfo, setSelectedCard } = dashboardOptionsSlice.actions;

export const selectShowCardInfo = (state: { store: StoreState }) => state.store.showCardInfo;
export const selectedCard = (state: { store: StoreState }) => state.store.activeSymbol;

export default dashboardOptionsSlice.reducer;
