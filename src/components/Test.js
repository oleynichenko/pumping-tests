import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import useRealm from '../hooks/useRealm';
import Questions from './Questions';
import TestHeader from './TestHeader';
import TestResultHeader from './TestResultHeader';
import { LoadingScreen } from './LoadingScreen';
import Error from './Error';
import realmService from '../services/RealmService';

function Test({ onCheckTest, isExam }) {
  const { realmFunctions, testsCol, questionsCol } = useRealm();
  const { testName } = useParams();

  const [test, setTest] = useState(null);
  const [testResults, setTestResults] = useState();
  const [error, setError] = useState('');

  const checkTest = (results) => {
    return realmFunctions.getTestResult(results).then((data) => {
      setTestResults(data);

      if (onCheckTest) {
        onCheckTest(data.percentScored, test.exam);
      }

      window.scrollTo(0, 0);
    });
  };

  useEffect(() => {
    if (!testName) {
      setError('Для загрузки теста введите правильный URL');
    }
  }, [testName]);

  useEffect(() => {
    if (!test && !!testName && testsCol && questionsCol) {
      realmService
        .getTest(testsCol, questionsCol, testName, isExam)
        .then((data) => setTest(data))
        .catch((err) => {
          const message =
            err.message || 'Ошибка загрзуки. Попробуйте перегрузить страницу';
          setError(message);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, testsCol, questionsCol]);

  if (error) {
    return <Error error={error} />;
  }

  if (!test) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Box component="header" sx={{ mb: 5 }}>
        {!testResults ? (
          <TestHeader title={test.title} />
        ) : (
          <TestResultHeader
            title={test.title}
            total={test.questionsData.length}
            levels={test.levels}
            result={testResults}
          />
        )}
      </Box>
      <Questions
        questions={test.questionsData}
        wrongAnsweredQuestionIds={testResults && testResults.wrongQuestionsIds}
        onSubmit={checkTest}
        onReset={() => {
          setTestResults(undefined);
          setTest(null);
        }}
      />
    </Container>
  );
}

export default Test;
