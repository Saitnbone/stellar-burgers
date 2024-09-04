import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showIngredientDetails } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // Получаем список ингредиентов
  const itemsList = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  // Текущее состояние выбранного ингредиента
  let ingredientData = useSelector(
    (state: RootState) => state.ingredients.ingredientData
  );

  useEffect(() => {
    if (id) {
      const searchElement = itemsList.find((element) => element._id === id);
      if (searchElement) {
        dispatch(showIngredientDetails(searchElement));
      } else {
      }
    }
  }, [id, dispatch, itemsList]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
