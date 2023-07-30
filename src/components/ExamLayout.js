import React, { useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import storeService from '../services/StorageService';
import Menu from './Menu';
import realmService from '../services/RealmService';
import useRealm from '../hooks/useRealm';
import Footer from './Footer';

function ExamLayout() {
  const navigate = useNavigate();
  const { passesCol } = useRealm();
  const { testName } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useLayoutEffect(() => {
    const passData = storeService.getItem(testName);

    if (passData && passesCol) {
      realmService
        .getPass(passesCol, passData.email, testName)
        .then((data) => {
          // in case there were passes on other browsers
          const updatedPass = { ...passData, ...data };

          storeService.setItem(testName, updatedPass);
          setIsAuthenticated(true);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passesCol]);

  const handleLoginSubmit = (pass) => {
    const { name, surname, email } = pass;

    realmService
      .getPass(passesCol, email, testName)
      .then((data) => {
        // we let a user to update a name and surname
        const passData = data
          ? { ...data, name, surname }
          : {
              name,
              surname,
              email,
              permalink: testName,
            };

        storeService.setItem(testName, passData);
        setIsAuthenticated(true);

        navigate(`/exam/${testName}/test`);
      })
      .catch((err) => console.log(err));
  };

  const handleLoginOut = () => {
    storeService.removeItem(testName);
    setIsAuthenticated(false);
    navigate(`/exam/${testName}`);
  };

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      {!!testName && (
        <Menu
          onLogOut={handleLoginOut}
          onLoginSubmit={handleLoginSubmit}
          isAuthenticated={isAuthenticated}
        />
      )}
      <Outlet />
      <Footer sx={{ mt: 'auto' }} />
    </Stack>
  );
}

export default ExamLayout;
