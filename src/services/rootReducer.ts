// Импорты
import { combineReducers } from 'redux';

import ingredientReduser from './slices/ingredients';
import cartReducer from './slices/cartBurger';
// import userRegReducer from './slices/userReg';
// import userInfReducer from './slices/userInfo';
// import userUpdateReducer from './slices/userUpd';
// import userAuthReducer from './slices/userAuth';
// import userLogoutReducer from './slices/userLogout';
import newOrderReducer from './slices/order/newOrder';
import ordersListReducer from './slices/order/orderList';
import feedsReducer from './slices/feeds';
import userReducer from './slices/user';

// Корневой редьюсер использует комбайн
const rootReducer = combineReducers({
  // userUpd: userUpdateReducer,
  // userAuth: userAuthReducer,
  // userLogout: userLogoutReducer,
  // userReg: userRegReducer,
  // userInf: userInfReducer,
  user: userReducer,
  ingredients: ingredientReduser,
  cart: cartReducer,
  newOrder: newOrderReducer,
  orderList: ordersListReducer,
  feeds: feedsReducer
});

export default rootReducer;
