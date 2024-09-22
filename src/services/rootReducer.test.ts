import { expect, test, describe } from '@jest/globals';
import rootReducer from './rootReducer';
import { initialState as ingredientsState } from './slices/ingredients/ingredients';
import { initialState as feedsState } from '././slices/feeds/feeds';
import { initialState as cartBurgerState } from './slices/cart-burger/cartBurger';
import { initialState as userState } from './slices/user/user';
import { initialState as newOrderState } from './slices/order/new-order/newOrder';
import { initialState as orderListState } from './slices/order/order-list/orderList';

// Состояние для тестов корневого редюсера
const testState = {
  user: userState,
  ingredients: ingredientsState,
  cart: cartBurgerState,
  newOrder: newOrderState,
  orderList: orderListState,
  feeds: feedsState
};

// Тест корневого редюсера
describe('Проверка инициализации корневого редюсера', () => {
  test('', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
});
