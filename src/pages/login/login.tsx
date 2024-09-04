import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
// import { fetchLoginUser } from '../../services/slices/userAuth';
import { TLoginData } from '../../utils/burger-api';
// import { Navigate } from 'react-router-dom';
// import { fetchUserInformation } from '../../services/slices/userInfo';
// import { setCookie } from '../../utils/cookie';
// import { refreshToken } from '../../utils/burger-api';
// import { setCookie } from '../../utils/cookie';
import { getUserError, loginUser } from '../../services/slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorUser = useSelector(getUserError);

  // const { status: loginStatus } = useSelector(
  //   (state: RootState) => state.userAuth
  // );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email,
        password: password
      })
    );

    const loginData: TLoginData = {
      email,
      password
    };
    // const result = await dispatch(fetchLoginUser(loginData));
    // if (fetchLoginUser.fulfilled.match(result)) {
    //   const { accessToken, refreshToken } = result.payload;
    //   if (accessToken) {
    //     setCookie('accessToken', accessToken, { expires: 7200, secure: true });
    //   }
    //   if (refreshToken) {
    //     localStorage.setItem('refreshToken', refreshToken);
    //   }
    //   dispatch(fetchUserInformation());
    // }
  };

  // Переадресовка пользователя на главную страницу приложения
  // if (loginStatus === 'succeeded') {
  //   return <Navigate to='/' />;
  // }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
