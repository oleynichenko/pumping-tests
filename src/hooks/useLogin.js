import { useState } from 'react';
import validateEmail from '../utils/validateEmail';

const initialLoginData = {
  name: '',
  surname: '',
  email: '',
};

const useLogin = () => {
  const [loginData, setLoginData] = useState(initialLoginData);
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoginDataValid, setLoginDataValid] = useState(false);

  const checkLoginData = (field, value) => {
    let errors = { ...loginErrors };

    if (['name', 'surname'].includes(field)) {
      errors = {
        ...errors,
        [field]: value === '',
      };
    }

    if (field === 'email') {
      errors = {
        ...errors,
        [field]: !validateEmail(value) || value === '',
      };
    }

    setLoginData({ ...loginData, [field]: value });

    setLoginDataValid(
      ['name', 'surname', 'email'].every((key) => !errors[key] && !!loginData[key])
    );

    setLoginErrors(errors);
  };

  const resetLogin = () => {
    setLoginData(initialLoginData);
  };

  return {
    isLoginDataValid,
    loginData,
    loginErrors,
    checkLoginData,
    resetLogin,
  };
};

export default useLogin;
