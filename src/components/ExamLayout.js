import React, { useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import storeService from '../services/StorageService';
import Menu from './Menu';
import realmService from '../services/RealmService';
import useRealm from '../hooks/useRealm';

function ExamLayout() {
  const navigate = useNavigate();
  const { passesCol } = useRealm();
  const { testName } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useLayoutEffect(() => {
    const userData = storeService.getItem('user');

    if (userData && passesCol) {
      realmService
        .getPass(passesCol, userData.email, testName)
        .then((data) => {
          storeService.setItem('user', data);
          setIsAuthenticated(true);
          // navigate(`/exam/${testName}`);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passesCol]);

  const handleLoginSubmit = (user) => {
    const { name, surname, email } = user;

    realmService
      .getPass(passesCol, email, testName)
      .then((data) => {
        const userData = data
          // we let a user to update a name and surname
          ? { ...data, name, surname }
          : {
              name,
              surname,
              email,
              permalink: testName,
            };

        storeService.setItem('user', userData);
        setIsAuthenticated(true);

        navigate(`/exam/${testName}/test`);
      })
      .catch((err) => console.log(err));
  };

  const handleLoginOut = () => {
    storeService.removeItem('user');
    setIsAuthenticated(false);
    navigate(`/exam/${testName}`);
  };

  return (
    <>
      {!!testName && (
        <Menu
          onLogOut={handleLoginOut}
          onLoginSubmit={handleLoginSubmit}
          isAuthenticated={isAuthenticated}
        />
      )}
      <Outlet />
    </>
  );
}

export default ExamLayout;
