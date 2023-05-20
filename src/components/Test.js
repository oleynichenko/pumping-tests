import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import useRealm from '../hooks/useRealm';
import Questions from './Questions';
import getTestName from '../utils/getTestName';
import { RequestStatus } from '../utils/request-status';

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
        <Typography variant="overline">Тест</Typography>
        <Typography component="h1" variant="h3" sx={{ mb: 1.5 }}>
          {test.title}
        </Typography>
        <Typography variant="subtitle1">
          В одном вопросе может быть несколько правильных ответов. Правильные
          ответы повышают, а неправильные — уменьшают оценку. После проверки
          вопрос будет выделен красным, если вы указали хотя бы один лишний или
          не доуказали хотя бы один правильный ответ.
        </Typography>
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
      {!!testResults ? (
        <Button variant="contained" onClick={reloadTest}>
          Пересдать
        </Button>
      ) : (
        <Button variant="contained" onClick={checkTest}>
          Оправить на проверку
        </Button>
      )}
    </Container>
  );
}

export default Test;
