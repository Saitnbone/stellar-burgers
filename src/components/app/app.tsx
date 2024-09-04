// Импорты
import styles from './app.module.css';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import '../../index.css';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getApiUser } from '../../services/slices/user';
import { fetchIngredienst } from '../../services/slices/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Проверка, на наличие свойства background
  const background = location.state?.background;

  /*
  Проверяем, совпадает ли текущий маршрут с /profile/orders/:number или
  /feed/:number и извлекаем параметр number  при совпадении
  */
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;

  // Номер заказа при совпадении на профиле или feed
  const orderNumber = profileMatch || feedMatch;

  // Подгрузка данных для приложения из стора редакса
  useEffect(() => {
    dispatch(fetchIngredienst());
    dispatch(getApiUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* Защищенные роуты для приложения */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyAuthUser>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyAuthUser>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyAuthUser>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyAuthUser>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Роут для не найденых страниц  */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Роуты для модальных окон */}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингридиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => navigate(-1)}
              >
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
