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
import storeService from '../services/StorageService';

function Test({ onCheckTest, isExam }) {
  const { realmFunctions, testsCol, questionsCol } = useRealm();
  const { testName } = useParams();

  const [test, setTest] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [error, setError] = useState('');

  const checkTest = (results) => {
    return realmFunctions.getTestResult(results).then((data) => {
      setTestResults(data);
      storeService.setTestResults(testName, data);

      if (onCheckTest) {
        // test.exam - shows the minimal score to be shown in exam results table
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
      const savedTest = storeService.getTest(testName);

      if (savedTest) {
        setTest(savedTest);

        const testResultsData = storeService.getTestResults(testName);

        if (!!testResultsData) {
          setTestResults(testResultsData);
        }
      } else {
        realmService
          .getTest(testsCol, questionsCol, testName, isExam)
          .then((data) => {
            storeService.setTest(testName, data);
            setTest(data);
          })
          .catch((err) => {
            const message = err.message || 'Ошибка загрузки. Попробуйте перегрузить страницу';
            setError(message);
          });
      }
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
            examMinScore={test.exam}
            total={test.questionsData.length}
            levels={test.levels}
            result={testResults}
          />
        )}
      </Box>
      <Questions
        testName={testName}
        questions={test.questionsData}
        wrongAnsweredQuestionIds={testResults && testResults.wrongQuestionsIds}
        onSubmit={checkTest}
        onReset={() => {
          setTestResults(null);
          storeService.setTestResults(testName, null);
          setTest(null);
          storeService.setTest(testName, null);
        }}
      />
    </Container>
  );
}

export default Test;
