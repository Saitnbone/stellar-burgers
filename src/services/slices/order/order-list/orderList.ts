import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../../../utils/types';
import { getOrdersApi } from '../../../../utils/burger-api';

// Тип для начального состояния
type TOrderListState = {
  orders: TOrder[];
};

// Начальное состояние
export const initialState: TOrderListState = {
  orders: []
};

// Асинхронный экшен для получения списка заказов
export const getOrdersList = createAsyncThunk(
  'orders/getOrdersList',
  getOrdersApi
);

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

const ordersListReducer = ordersListSlice.reducer;

export default ordersListReducer;
