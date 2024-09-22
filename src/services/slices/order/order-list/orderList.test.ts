import { expect, test, describe } from '@jest/globals';

import { initialState, getOrdersList } from './orderList';
import ordersListReducer from './orderList';

describe('Проверка слоя "ordersListSlice"', () => {
  const ordersListData = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: '1',
      createdAt: '1',
      updatedAt: '1',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'done',
      name: '2',
      createdAt: '2',
      updatedAt: '2',
      number: 2
    }
  ];

  test('Тестирование состояния запроса "fulfilled" для "ordersListSlice"', () => {
    const fulfilled = {
      ...initialState,
      orders: ordersListData
    };

    const action = {
      type: getOrdersList.fulfilled.type,
      payload: ordersListData
    };
    const newState = ordersListReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
