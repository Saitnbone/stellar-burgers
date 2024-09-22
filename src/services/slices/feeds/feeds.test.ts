import { expect, test, describe } from '@jest/globals';

import { initialState, fetchGetFeed } from './feeds';
import feedsReducer from './feeds';

describe('', () => {
  const feedsData = {
    orders: [
      {
        _id: '1',
        ingredients: ['1', '2', '3', '4'],
        status: 'done',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1
      },
      {
        _id: '2',
        ingredients: ['5', '6', '7', '8'],
        status: 'done',
        name: '2',
        createdAt: '2',
        updatedAt: '2',
        number: 2
      }
    ],
    total: 2,
    totalToday: 2
  };

  test('', () => {
    const fulfilled = {
      ...initialState,
      orders: feedsData.orders,
      total: feedsData.total,
      totalToday: feedsData.totalToday
    };

    const action = {
      type: fetchGetFeed.fulfilled.type,
      payload: feedsData
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
