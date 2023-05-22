import React, { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
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
  const { testsCol, questionsCol } = useRealm();

  const checkTest = () => {
    setTestResults(
      //   {
      //   '13': ['a', 'b', 'd'],
      //   '8': ['b', 'c'],
      //   '23': ['a', 'c']
      // }
      {
        wrongAnsweredQuestionIds: [13, 23],
      }
    );
  };

  const reloadTest = () => {
    setTestResults(undefined);
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

      testRequest.then(([testData]) => {
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
          <TestResultHeader title={test.title} />
        )}
      </Box>
      <Questions
        sx={{ mb: 4 }}
        questions={test.questionsData}
        wrongAnsweredQuestionIds={
          testResults && testResults.wrongAnsweredQuestionIds
        }
        answers={testResults}
        isChecked={!!testResults}
      />
      {!testResults ? (
        <Button variant="contained" onClick={checkTest}>
          Оправить на проверку
        </Button>
      ) : (
        <Button variant="contained" onClick={reloadTest}>
          Пересдать
        </Button>
      )}
    </Container>
  );
}

export default Test;
