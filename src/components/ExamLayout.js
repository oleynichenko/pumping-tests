import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Login from './Login';
import storeService from '../services/StorageService';

function ExamLayout() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = storeService.getItem();

    if (userData) {
      setUser(userData);
    }
  }, [])

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLoginSubmit = (data) => {
    setUser(data);
    storeService.setItem('user', data);
    setLoginOpen(false);
  };

  const handleLoginOut = () => {
    storeService.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Toolbar>
        <Button sx={{ ml: 'auto', mr: 1 }}>Главная</Button>
        {!user
          ? <Button onClick={handleLoginOpen}>Сдать тест</Button>
          : <Button onClick={handleLoginOut}>Выйти</Button>
        }
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
