import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import useRealm from '../hooks/useRealm';
import Questions from './Questions';
import getTestName from '../utils/getTestName';
import { RequestStatus } from '../utils/request-status';
import TestHeader from './TestHeader';
import TestResultHeader from './TestResultHeader';
import { LoadingScreen } from './LoadingScreen';

function Test() {
  const [test, setTest] = useState();
  const [testResults, setTestResults] = useState();
  const [status, setStatus] = useState(RequestStatus.Undone);
  const [error, setError] = useState('');
  const { user, testsCol, questionsCol } = useRealm();

  const checkTest = (results) => {
    return user.functions.getTestResult(results).then((data) => {
      setTestResults(data);
    });
  };

  useEffect(() => {
    if (!!test) {
      return;
    }

    if (!testsCol || !questionsCol) {
      setStatus(RequestStatus.Waiting);
      return;
    }

    const testName = getTestName();

    if (!testName) {
      setError('Для загрузки теста введите правильный URL');
      setStatus(RequestStatus.Done);

      return;
    }

    const testPipeline = [
      { $match: { 'links.permalink': testName } },
      { $unwind: `$links` },
      { $match: { 'links.permalink': testName } },
      {
        $project: {
          title: 1,
          description: 1,
          links: 1,
          questions: 1,
          'levels.conclusionPhrase': 1,
          'levels.score': 1,
        },
      },
    ];

    const testRequest = testsCol.aggregate(testPipeline);

    testRequest.then((data) => {
      if (!data || data.length === 0) {
        setError('Теста с таким URL не существует');
        setStatus(RequestStatus.Done);

        return;
      }

      const testData = JSON.parse(JSON.stringify(data[0]));

      const {
        questions: { themes },
        links: { questionsQuantity },
      } = testData;

      return questionsCol
        .aggregate([
          {
            $match: { themes: { $in: themes } },
          },
          {
            $sample: { size: questionsQuantity },
          },
          {
            $sort: { id: 1 },
          },
        ])
        .then((questionsData) => {
          setTest({ ...testData, questionsData });
          setStatus(RequestStatus.Done);
        });
    });
  }, [testsCol, test, questionsCol]);

  if (error) {
    return (
      <Typography component="h4" sx={{ mt: 4, textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  if (status !== RequestStatus.Done) {
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
          setTest(undefined);
          setStatus(RequestStatus.Undone);
        }}
      />
    </Container>
  );
}

export default Test;
