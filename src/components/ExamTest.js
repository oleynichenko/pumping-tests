import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import storeService from '../services/StorageService';
import realmService from '../services/RealmService';
import Test from './Test';
import useRealm from '../hooks/useRealm';

function ExamTest() {
  const { passesCol } = useRealm();
  const { testName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = storeService.getItem('user');

    if (!user) {
      navigate(`/exam/${testName}`);
    } else {
      setUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTestResult = (score, examMinScore) => {
    realmService.savePass(passesCol, user, score, examMinScore).then((data) => {
      storeService.setItem('user', data);
      setUser(data);
    });
  };

  return (
    <>
      <Toolbar>
        {user && user.score && (
          <Typography variant="subtitle" color={'warning.light'} sx={{ ml: 'auto', textAlign: 'right' }}>
            {`${user.name} ${user.surname}, ваш максимальный результат ${Math.max(
              ...user.score
            )}%`}
          </Typography>
        )}
      </Toolbar>
      <Test onCheckTest={(score, examMinScore) => saveTestResult(score, examMinScore)} />
    </>
  );
}

export default ExamTest;
