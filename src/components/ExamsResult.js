import React, {useEffect, useState} from 'react';
import {Container, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Error from './Error';
import useRealm from '../hooks/useRealm';
import realmService from '../services/RealmService';
import {RequestStatus} from '../utils/request-status';
import {DEFAULT_ERROR_MESSAGE} from '../Constants';
import {LoadingScreen} from './LoadingScreen';
import ExamsResultTable from "./ExamsResultTable";

function ExamsResult() {
  const { examsList } = useParams();

  const [results, setResults] = useState();
  const [tests, setTests] = useState();
  const { passesCol, testsCol } = useRealm();
  const [error, setError] = useState('');
  const [status, setStatus] = useState(RequestStatus.Undone);

  useEffect(() => {
    if (!error && !!passesCol && !!testsCol) {
      const examIds = examsList.split('-').map(item => `${item}-exam`);

      Promise.all([
        realmService.getTestTitles(testsCol, examIds),
        realmService.getExamsResult(passesCol, examIds, 90)
      ])
        .then(([tests, data] ) => {
          setTests(tests);

          const results = data.map((item) => {
            const { passes, _id } = item;

            return {
              id: _id,
              person: `${passes[0].surname} ${passes[0].name} `,
              data: passes.reduce((acc, pass) => {
                acc[pass.permalink] = `${Math.max(...pass.score)}%`;

                return acc;
              }, {}),
            };
          }).sort((a, b) => a.person.toLowerCase() > b.person.toLowerCase() ? 1 : -1);

          setResults(results);
        })
        .catch((err) => {
          const message = err.message || DEFAULT_ERROR_MESSAGE;
          setError(message);
        })
        .finally(() => setStatus(RequestStatus.Done));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passesCol, testsCol]);

  if (error) {
    return <Error error={error} />;
  }

  if (status !== RequestStatus.Done) {
    return <LoadingScreen />;
  }

  if (results && !results.length) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 12 } }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 500 }}>
        Результаты экзаменов серии курсов
      </Typography>
      <Typography component="h1" variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
        Знакомство с каббалой
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 6, textAlign: 'center' }}>
        Результаты считаются действительными в течении года с момента сдачи экзамена.
      </Typography>
      <ExamsResultTable results={results} tests={tests}></ExamsResultTable>
    </Container>
  );
}

export default ExamsResult;
