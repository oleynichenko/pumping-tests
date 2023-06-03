import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import useRealm from '../hooks/useRealm';
import Questions from './Questions';
import getTestName from '../utils/getTestName';
import { RequestStatus } from '../utils/request-status';
import TestHeader from './TestHeader';
import TestResultHeader from './TestResultHeader';

function Test() {
  const [test, setTest] = useState();
  const [testResults, setTestResults] = useState();
  const [status, setStatus] = useState(RequestStatus.Undone);
  const { user, testsCol, questionsCol } = useRealm();
  // console.log('testResults', testResults);
  const checkTest = (results) => {
    user.functions.getTestResult(results).then((data) => {
      setTestResults(data)
      console.log(data);
    });
  };

  useEffect(() => {
    if (testsCol && status === RequestStatus.Undone) {
      const testName = getTestName();

      if (!testName) {
        setStatus(RequestStatus.Done);
      }

      setStatus(RequestStatus.Waiting);

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
          },
        },
      ];

      const testRequest = testsCol.aggregate(testPipeline);

      testRequest.then((testData) => {
        if (!testData || testData.length === 0) {
          return;
        }

        const {
          questions: { themes },
          links: { questionsQuantity },
        } = testData[0];

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
            setTest({ ...testData[0], questionsData });
            setStatus(RequestStatus.Done);
          });
      });
    }
  }, [testsCol]);

  if (!test) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box component="header" sx={{ mb: 5 }}>
        {!testResults ? (
          <TestHeader title={test.title} />
        ) : (
          <TestResultHeader
            title={test.title}
            result={testResults}
          />
        )}
      </Box>
      <Questions
        questions={test.questionsData}
        wrongAnsweredQuestionIds={
          testResults && testResults.wrongQuestionsIds
        }
        onSubmit={checkTest}
        onReset={() => setTestResults(undefined)}
      />
    </Container>
  );
}

export default Test;
