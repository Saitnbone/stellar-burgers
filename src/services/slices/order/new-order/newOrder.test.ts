import { expect, test, describe } from '@jest/globals';

import { initialState, getNewOrder } from '../new-order/newOrder';
import newOrderReducer from '../new-order/newOrder';

describe('Проверка слоя "newOrderSlice"', () => {
  const newOrderData = {
    name: 'Some name',
    orders: [
      {
        _id: '1',
        name: '1',
        type: 'bun',
        proteins: 100,
        fat: 20,
        carbohydrates: 15,
        calories: 250,
        price: 750,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 1
      },
      {
        _id: '12',
        name: '12',
        type: 'main',
        proteins: 100,
        fat: 20,
        carbohydrates: 15,
        calories: 250,
        price: 750,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 2
      },
      {
        _id: '123',
        name: '123',
        type: 'main',
        proteins: 123,
        fat: 123,
        carbohydrates: 123,
        calories: 123,
        price: 123,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 3
      },
      {
        _id: '1234',
        name: '1234',
        type: 'main',
        proteins: 1234,
        fat: 1234,
        carbohydrates: 1234,
        calories: 1234,
        price: 1234,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 4
      },
      {
        _id: '12345',
        name: '12345',
        type: 'bun',
        proteins: 12345,
        fat: 12345,
        carbohydrates: 12345,
        calories: 12345,
        price: 12345,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 5
      }
    ]
  };

  const mockError = {
    message: 'Bad request'
  };

  const newState = (action: { type: string; payload?: {} }) =>
    newOrderReducer(initialState, action);

  test('Тестирование состояния запроса "pending" для "newOrderSlice"', () => {
    const pending = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: getNewOrder.pending.type,
      payload: newOrderData
    };

    expect(newState(action)).toStrictEqual(pending);
  });

  test('Тестирование состояния запроса "fulfilled" для "newOrderSlice"', () => {
    const fulfilled = {
      ...initialState,
      orderRequest: false,
      order: newOrderData.orders,
      name: newOrderData.name
    };

    const action = {
      type: getNewOrder.fulfilled.type,
      payload: { order: newOrderData.orders, name: newOrderData.name }
    };

    expect(newState(action)).toStrictEqual(fulfilled);
  });

  test('Тестирование состояния запроса "rejected" для "newOrderSlice"', () => {
    const reject = {
      ...initialState,
      orderRequest: false
    };

    const action = {
      type: getNewOrder.rejected.type,
      error: mockError
    };

    expect(newState(action)).toStrictEqual(reject);
  });
});
