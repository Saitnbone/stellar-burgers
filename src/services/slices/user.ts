import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';

// Тип для начального состояния пользователя
type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

//  Начальное состояние на слой пользователя
export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

// Экшены на слой пользователя
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getApiUser = createAsyncThunk('user/request', getUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

// Слой пользователя
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    checkUserAuth: (state) => state.isAuthChecked,
    getUserError: (state) => state.error,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name
  },
  extraReducers: (builder) => {
    // Обработка регистрации пользователя
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error?.message || null;
      });
    // Получение информации о пользователе
    builder

      .addCase(getApiUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getApiUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error?.message || null;
      });
    //   Логирование пользователя в приложении
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    //   Выход пользователя из приложения
    builder.addCase(logoutUser.fulfilled, (state) => (state = initialState));
    // Обновление информации о пользователе
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
  }
});
export const { getUserError, getUser, getUserName, checkUserAuth } =
  userSlice.selectors;

const userReducer = userSlice.reducer;
export default userReducer;
