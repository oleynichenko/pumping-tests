import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Error from './Error';
import useRealm from '../hooks/useRealm';
import realmService from '../services/RealmService';
import { RequestStatus } from '../utils/request-status';
import { DEFAULT_ERROR_MESSAGE } from '../Constants';
import { LoadingScreen } from './LoadingScreen';

function ExamResults({ testName, minScore }) {
  const [results, setResults] = useState();
  const { passesCol } = useRealm();
  const [error, setError] = useState('');
  const [status, setStatus] = useState(RequestStatus.Undone);

  useEffect(() => {
    if (!error && !!passesCol) {
      realmService
        .getExamResults(passesCol, testName, minScore)
        .then((data) => setResults(data))
        .catch((err) => {
          const message = err.message || DEFAULT_ERROR_MESSAGE;

          setError(message);
        })
        .finally(() => setStatus(RequestStatus.Done));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passesCol]);

  if (error) {
    return <Error error={error} />;
  }

  if (status !== RequestStatus.Done) {
    return <LoadingScreen />;
  }

  const formatDate = (date, time) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (time) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    }

    return date.toLocaleDateString('ru-RU', options);
  };

  if (results && !results.length) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Дата сдачи</TableCell>
            <TableCell>Имя, фамилия</TableCell>
            <TableCell>Результат</TableCell>
            <TableCell>Дата обновления</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{formatDate(result.passDate)}</TableCell>
              <TableCell component="th" scope="result">
                {`${result.name} ${result.surname}`}
              </TableCell>
              <TableCell>{`${Math.max(...result.score)}%`}</TableCell>
              <TableCell>{formatDate(result.updated, true)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExamResults;
