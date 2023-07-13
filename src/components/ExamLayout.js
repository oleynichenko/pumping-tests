import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Login from './Login';
import storeService from '../services/StorageService';

function ExamLayout() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = storeService.getItem('user');
    // get userFromServer by email
    const user = userData ? { ...userData } : null;

    if (user) {
      // set in store in case it was changed on another device
      storeService.setItem('user', user);
      setUser(user);
    }
  }, []);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLoginSubmit = (data) => {
    //remove set score
    setUser({ ...data, score: '34%' });
    storeService.setItem('user', { ...data, score: '34%' });
    setLoginOpen(false);
  };

  const handleLoginOut = () => {
    storeService.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Button sx={{ ml: 'auto', mr: 1 }}>Главная</Button>
        {!user ? (
          <Button onClick={handleLoginOpen}>Сдать экзамен</Button>
        ) : (
          <Button onClick={handleLoginOut}>Выйти</Button>
        )}
      </Toolbar>
      <Toolbar>
        {user && user.score && (
          <Typography
            variant="h5"
            color={'warning.light'}
            sx={{ ml: 'auto' }}
          >
            {`${user.name} ${user.surname}, ваш макс. результат ${user.score}`}
          </Typography>
        )}
      </Toolbar>
      {loginOpen && (
        <Login onClose={handleLoginClose} onSubmit={handleLoginSubmit} />
      )}
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default ExamLayout;
