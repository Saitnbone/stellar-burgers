import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
// import { fetchRegUser } from '../../services/slices/userReg';
import { registerUser } from '../../services/slices/user';
import { RootState } from '../../services/store';
import { Navigate } from 'react-router-dom';
// import { setCookie } from '../../utils/cookie';
// import { fetchUserInformation } from '../../services/slices/userInfo';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const formData = {
  //   name: userName,
  //   email: email,
  //   password: password
  // };

  // Переменная для проверки статуса пользователя
  // const { status: userStatus } = useSelector(
  //   (state: RootState) => state.userReg
  // );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
    // try {
    //   const resultAction = await dispatch(fetchRegUser(formData));
    //   if (fetchRegUser.fulfilled.match(resultAction)) {
    //     const { accessToken, refreshToken } = resultAction.payload;
    //     setCookie('accessToken', accessToken);
    //     localStorage.setItem('refreshToken', refreshToken);
    //     dispatch(fetchUserInformation());
    //     console.log('Registration successful');
    //   }
    // } catch (error: any) {
    //   console.log(error.message);
    // }
  };

  // Переадресовка пользователя на главную страницу приложения
  // if (userStatus === 'succeeded') {
  //   return <Navigate to='/' />;
  // }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
