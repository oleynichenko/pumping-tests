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
  const [pass, setPass] = useState(null);

  useEffect(() => {
    const pass = storeService.getPass(testName);

    if (!pass) {
      navigate(`/exam/${testName}`);
    } else {
      setPass(pass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTestResult = (score, examMinScore) => {
    realmService.savePass(passesCol, pass, score, examMinScore).then((data) => {
      storeService.setPass(testName, data);
      setPass(data);
    });
  };

  return (
    <>
      <Toolbar>
        {pass && pass.score && (
          <Typography variant="subtitle" color={'warning.light'} sx={{ ml: 'auto', textAlign: 'right' }}>
            {`${pass.name} ${pass.surname}, ваш максимальный результат ${Math.max(
              ...pass.score
            )}%`}
          </Typography>
        )}
      </Toolbar>
      <Test onCheckTest={(score, examMinScore) => saveTestResult(score, examMinScore)} isExam={true}/>
    </>
  );
}

export default ExamTest;
