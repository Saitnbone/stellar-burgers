// Импорты
import { combineReducers } from 'redux';

import ingredientReduser from './slices/ingredients/ingredients';
import cartReducer from './slices/cart-burger/cartBurger';
import newOrderReducer from './slices/order/new-order/newOrder';
import ordersListReducer from './slices/order/order-list/orderList';
import feedsReducer from './slices/feeds/feeds';
import userReducer from './slices/user/user';

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
