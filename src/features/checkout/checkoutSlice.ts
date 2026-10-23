import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Address } from '../../types/models';

interface CheckoutState {
  address: Address | null;
  paymentMethod: string;
}

const initialState: CheckoutState = {
  address: null,
  paymentMethod: 'CARD',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const { setAddress, setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
