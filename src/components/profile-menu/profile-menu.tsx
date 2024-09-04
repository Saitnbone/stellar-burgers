import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user';
// import { fetchLogoutUser } from '../../services/slices/userLogout';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Функция для разлогирования пользователя
  const handleLogout = () => {
    // const result = await dispatch(fetchLogoutUser());
    dispatch(logoutUser());
    // if (fetchLogoutUser.fulfilled.match(result)) {
    //   navigate('/'); // Перенаправление на страницу логина после успешного выхода
    // }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
