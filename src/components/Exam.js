import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from './Error';
import useRealm from '../hooks/useRealm';
import realmService from '../services/RealmService';
import { RequestStatus } from '../utils/request-status';
import { DEFAULT_ERROR_MESSAGE } from '../Constants';

// TODO add exam data receiving
function Exam() {
  const { testName } = useParams();
  const { testsCol } = useRealm();
  const [test, setTest] = useState();
  const [error, setError] = useState('');
  const [status, setStatus] = useState(RequestStatus.Undone);

  useEffect(() => {
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
  }, [testsCol]);

  if (!testName) {
    return (
      <Error error="Для загрузки экзаменационного теста введите правильный URL" />
    );
  }

  return <p>hello</p>;
}

export default Exam;
