import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Login from './Login';

function Menu({ onLogOut, onLoginSubmit, isAuthenticated }) {
  const { testName } = useParams();
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleLoginSubmit = (data) => {
    onLoginSubmit(data);
    setLoginModalOpen(false);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        {isAuthenticated && (
          <>
            <Button
              sx={{ ml: 'auto', mr: 1 }}
              onClick={() => navigate(`/exam/${testName}`)}
            >
              Главная
            </Button>
            <Button
              sx={{ mr: 1 }}
              onClick={() => navigate(`/exam/${testName}/test`)}
            >
              Тест
            </Button>
            <Button onClick={onLogOut}>Выйти</Button>
          </>
        )}
        {!isAuthenticated && <Button onClick={handleLoginOpen}>Вход</Button>}
      </Toolbar>
      {loginModalOpen && (
        <Login onClose={handleLoginClose} onSubmit={handleLoginSubmit} />
      )}
    </>
  );
}

export default Menu;
