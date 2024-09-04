import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { orderBurgerApi } from '../../../utils/burger-api';

// Интерфейс начального состояния
type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

// Начальное состояние
export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

// Асинхронный экшен для заказа
export const getNewOrder = createAsyncThunk(
  'order/getNewOrder',
  orderBurgerApi
);

// Слой для заказа
const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getNewOrderModalData: (state) => state.order,
    getNewOrderName: (state) => state.name,
    getNewOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;

export const { getNewOrderModalData, getNewOrderName, getNewOrderRequest } =
  newOrderSlice.selectors;

const newOrderReducer = newOrderSlice.reducer;

export default newOrderReducer;
