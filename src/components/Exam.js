import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Error from './Error';
import useRealm from '../hooks/useRealm';
import realmService from '../services/RealmService';
import { RequestStatus } from '../utils/request-status';
import { DEFAULT_ERROR_MESSAGE } from '../Constants';
import { LoadingScreen } from './LoadingScreen';
import ExamResults from './ExamResults';

function Exam() {
  const { testName } = useParams();
  const { testsCol } = useRealm();
  const [test, setTest] = useState();
  const [error, setError] = useState('');
  const [status, setStatus] = useState(RequestStatus.Undone);

  useEffect(() => {
    if (error) {
      return;
    }

    if (!testName) {
      setError('Для загрузки теста введите правильный URL');
      setStatus(RequestStatus.Done);

      return;
    }

    if (!testsCol) {
      return;
    }

    setStatus(RequestStatus.Waiting);

    realmService
      .getExam(testsCol, testName)
      .then((data) => setTest(data))
      .catch((err) => {
        const message = err.message || DEFAULT_ERROR_MESSAGE;

        setError(message);
      })
      .finally(() => setStatus(RequestStatus.Done));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testsCol]);

  if (error) {
    return <Error error={error} />;
  }

  if (status !== RequestStatus.Done) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 500 }}>
        Экзаменационный тест курса
      </Typography>
      <Typography component="h1" variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
        {test.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 5, textAlign: 'center' }}>
        {test.description}
      </Typography>
      <ExamResults testName={testName} minScore={test.exam} />
    </Container>
  );
}

export default Exam;
