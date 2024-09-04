// Импорты
import { combineReducers } from 'redux';

import ingredientReduser from './slices/ingredients';
import cartReducer from './slices/cartBurger';
import newOrderReducer from './slices/order/newOrder';
import ordersListReducer from './slices/order/orderList';
import feedsReducer from './slices/feeds';
import userReducer from './slices/user';

// Корневой редьюсер использует комбайн
const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReduser,
  cart: cartReducer,
  newOrder: newOrderReducer,
  orderList: ordersListReducer,
  feeds: feedsReducer
});

export default rootReducer;
