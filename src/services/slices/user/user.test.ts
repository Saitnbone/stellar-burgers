import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  getApiUser,
  logoutUser,
  registerUser,
  loginUser,
  updateUser
} from '../user/user';
import userReducer from '../user/user';

describe('Проверка слоя "userSlice"', () => {
  const mockUser = {
    user: {
      email: 'test@test.ru',
      name: 'user'
    }
  };

  const userError = {
    message: 'Ошибка'
  };

  const newState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Проверка getApiUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния запроса "fulfilled" для "getApiUser"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: null
      };

      const action = {
        type: getApiUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния запроса "rejected" для  "getApiUser"', () => {
      const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: userError.message
      };

      const action = {
        type: getApiUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Тесты для проверки регистрации пользователя
  describe('Проверка registerUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния запроса "pending" для "registerUser"', () => {
      const pending = {
        ...initialState,
        error: null
      };

      const action = {
        type: registerUser.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния запроса "fulfilled" для "registerUser"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: null
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния запроса "rejected" для "registerUser"', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };

      const action = {
        type: registerUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Логирование пользователя
  describe('Проверка loginUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "pending" для loginUser', () => {
      const pending = {
        ...initialState,
        isAuthChecked: false,
        error: null
      };

      const action = {
        type: loginUser.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния "fulfilled" для loginUser', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: null
      };

      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния "rejected" для loginUser', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };

      const action = {
        type: loginUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Разлогирование пользователя
  describe('Проверка logoutUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "fulfilled" для "logoutUser"', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };

      expect(newState(action)).toStrictEqual(initialState);
    });
  });

  // Обновление информации о пользователе
  describe('Проверка updateUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "pending" для "updateUser"', () => {
      const pending = {
        ...initialState,
        error: null
      };
      const action = {
        type: updateUser.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния "fulfilled" для "updateUser"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: null
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния "rejected" для "updateUser"', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };
      const action = {
        type: updateUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });
});
