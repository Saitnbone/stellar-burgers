import { expect, test, describe } from '@jest/globals';
import { initialState, fetchIngredienst } from '../ingredients/ingredients';
import ingredientReduser from '../ingredients/ingredients';

describe('Проверка редюсера слоя ingredientsSlice', () => {
  const storeIngredients = [
    {
      _id: '1',
      name: '1',
      type: '1',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 94315,
      image: '1',
      image_mobile: '1',
      image_large: '1'
    },
    {
      _id: '2',
      name: '2',
      type: '2',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 2,
      price: 1234,
      image: '2',
      image_mobile: '2',
      image_large: '2'
    },
    {
      _id: '3',
      name: '3',
      type: '3',
      proteins: 3,
      fat: 3,
      carbohydrates: 3,
      calories: 3,
      price: 12346,
      image: '3',
      image_mobile: '3',
      image_large: '3'
    }
  ];

  test('Тестирование состояния запроса "pending" для ingredientsSlice', () => {
    const pending = {
      ...initialState,
      error: null,
      loading: true
    };

    const action = {
      type: fetchIngredienst.pending.type,
      payload: storeIngredients
    };

    const newState = ingredientReduser(initialState, action);
    expect(newState).toStrictEqual(pending);
  });

  test('Тестирование состояния запроса "fullfield" для ingredientsSlice', () => {
    const fulfilled = {
      ...initialState,
      ingredients: storeIngredients,
      error: null,
      loading: false
    };

    const action = {
      type: fetchIngredienst.fulfilled.type,
      payload: storeIngredients
    };

    const newState = ingredientReduser(initialState, action);
    expect(newState).toStrictEqual(fulfilled);
  });

  test('Тестирование состояния запроса "reject" для ingredientsSlice', () => {
    const reject = {
      ...initialState,
      error: 'Ошибка загрузки',
      loading: false
    };

    const action = {
      type: fetchIngredienst.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };

    const newState = ingredientReduser(initialState, action);
    expect(newState).toStrictEqual(reject);
  });
});
