import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import useRealm from '../hooks/useRealm';
import Questions from './Questions';
import TestResultHeader from './TestResultHeader';
import { LoadingScreen } from './LoadingScreen';
import Error from './Error';
import realmService from '../services/RealmService';
import storeService from '../services/StorageService';
import Material from './Material';
import Terms from "./Terms";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function Test({ onCheckTest, isExam }) {
  const { realmFunctions, testsCol, questionsCol } = useRealm();
  const { testName } = useParams();

  const [test, setTest] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [value, setValue] = useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const material = test.material && test.material[0];
  const isDictionary = test.terms && test.terms.length;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 10, md: 12 } }}>
      <Typography component="h1" variant="h4" sx={{ mb: { xs: 3, md: 4 } }}>
        {test.title}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={value} centered variant="fullWidth" onChange={handleChange}>
          <Tab label="Тест" />
          {!!material && <Tab label="Текст урока" />}
          {!!isDictionary && <Tab label="Словарь" />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ mb: 3 }}>
          {!testResults ? (
            <Typography component="p" variant="subtitle1" textAlign="justify">
              В одном вопросе может быть несколько правильных ответов. Правильные ответы повышают, а неправильные —
              уменьшают оценку. После проверки вопрос будет выделен красным, если вы указали хотя бы один лишний или не
              доуказали хотя бы один правильный ответ.
            </Typography>
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
      </TabPanel>
      {!!material && (
        <TabPanel value={value} index={1}>
          <Material content={material.content} />
        </TabPanel>
      )}
      {!!isDictionary && (
        <TabPanel value={value} index={2}>
          <Terms data={test.terms} />
        </TabPanel>
      )}
    </Container>
  );
}

export default Test;
