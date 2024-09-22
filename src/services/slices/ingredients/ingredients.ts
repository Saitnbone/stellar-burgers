// Импорты
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../../utils/burger-api';

// Интерфейс начального состояния
type TIngredientsState = {
  ingredientData: TIngredient | null;
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

// Настройки для начального состояния
export const initialState: TIngredientsState = {
  ingredientData: null,
  ingredients: [],
  loading: false,
  error: null
};

// Thunk слоя для получения данных ингредиентов
export const fetchIngredienst = createAsyncThunk(
  '/ingredients/fetchIngredienst',
  getIngredientsApi
);

// Слой индрегдиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      console.log('Updating ingredient data:', action.payload);
      state.ingredientData = action.payload;
    }
  },
  selectors: {
    getIngredientsLoading: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredienst.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredienst.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredienst.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const { showIngredientDetails } = ingredientsSlice.actions;
export const { getIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;

const ingredientReduser = ingredientsSlice.reducer;

export default ingredientReduser;
