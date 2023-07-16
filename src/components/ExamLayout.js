import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import storeService from '../services/StorageService';
import Menu from './Menu';

function ExamLayout() {
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

  const handleLoginSubmit = (data) => {
    // remove set score
    setUser({ ...data, score: '34%' });
    storeService.setItem('user', { ...data, score: '34%' });
  };

  const handleLoginOut = () => {
    storeService.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Menu
        onLogOut={handleLoginOut}
        onLoginSubmit={handleLoginSubmit}
        isAuthenticated={!!user}
      />
      <Toolbar>
        {user && user.score && (
          <Typography variant="h5" color={'warning.light'} sx={{ ml: 'auto' }}>
            {`${user.name} ${user.surname}, ваш макс. результат ${user.score}`}
          </Typography>
        )}
      </Toolbar>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default ExamLayout;
