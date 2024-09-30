import { expect, test, describe } from '@jest/globals';

import {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerCart
} from './cartBurger';
import cartReducer from './cartBurger';

describe('Проверка слоя "cartBurgerSlice"', () => {
  const bun = {
    calories: 2,
    carbohydrates: 2,
    fat: 2,
    id: 'test2',
    image: '2',
    image_large: '2',
    image_mobile: '2',
    name: '2',
    price: 2,
    proteins: 2,
    type: 'sauce',
    __v: 2,
    _id: '2'
  };
  const cartIngredient = {
    calories: 2,
    carbohydrates: 2,
    fat: 2,
    id: 'test2',
    image: '2',
    image_large: '2',
    image_mobile: '2',
    name: '2',
    price: 2,
    proteins: 2,
    type: 'sauce',
    __v: 2,
    _id: '2'
  };

  const newCartIngredient = {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    id: 'testID_3',
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa0941'
  };

  test('Должен вернуть начальное состояние по умолчанию', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Тестирование добавления булочки в "cartBurgerSlice"', () => {
    const action = addBun(bun);
    const newState = cartReducer(initialState, action);
    expect(newState.bun).toEqual(bun);
  });

  test('Тестирование добавления ингредиента в "cartBurgerSlice"', () => {
    const action = addIngredient(cartIngredient);
    const newState = cartReducer(initialState, action);
    expect(newState.ingredients).toEqual([cartIngredient]);
  });

  test('Удаление ингредиента', () => {
    const actionAdd = addIngredient(cartIngredient);
    const stateWithIngredient = cartReducer(initialState, actionAdd);

    const actionRemove = removeIngredient(0);
    const newState = cartReducer(stateWithIngredient, actionRemove);
    expect(newState.ingredients).toEqual([]);
  });

  test('Перемещение ингредиента вверх', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [cartIngredient, newCartIngredient]
    };

    const action = moveIngredientUp(1);
    const newState = cartReducer(stateWithIngredients, action);

    expect(newState.ingredients).toEqual([newCartIngredient, cartIngredient]);
  });

  test('Перемещение ингредиента вниз', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [cartIngredient, newCartIngredient]
    };

    const action = moveIngredientDown(0);
    const newState = cartReducer(stateWithIngredients, action);

    expect(newState.ingredients).toEqual([newCartIngredient, cartIngredient]);
  });

  test('Очистка корзины', () => {
    const stateWithIngredients = {
      bun: bun,
      ingredients: [cartIngredient, newCartIngredient]
    };

    const action = clearBurgerCart();
    const newState = cartReducer(stateWithIngredients, action);

    expect(newState).toEqual(initialState);
  });
});
