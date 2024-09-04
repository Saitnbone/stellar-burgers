// Импорты
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

// Интерфейс начального состояния
type IngredientsState = {
  ingredientData: TIngredient | null;
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

// Настройки для начального состояния
const initialState: IngredientsState = {
  ingredientData: null,
  ingredients: [],
  loading: false,
  error: null
};

// Thunk слоя для получения данных ингредиентов
export const fetchIngredienst = createAsyncThunk(
  '/ingredients/fetchIngredienst',
  async () => getIngredientsApi()
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
        state.error = action.payload as string;
      });
  }
});

export const { showIngredientDetails } = ingredientsSlice.actions;
export const { getIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;

const ingredientReduser = ingredientsSlice.reducer;

export default ingredientReduser;
