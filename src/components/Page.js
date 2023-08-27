import React, { useEffect, useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import useRealm from '../hooks/useRealm';
import getTestName from '../utils/getTestName';
import { RequestStatus } from '../utils/request-status';
import { LoadingScreen } from './LoadingScreen';
import Test from './Test';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function Page() {
  const [test, setTest] = useState();
  const [testResults, setTestResults] = useState();
  const [status, setStatus] = useState(RequestStatus.Undone);
  const [error, setError] = useState('');
  const { user, testsCol, questionsCol } = useRealm();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckTest = (results) => {
    return user.functions.getTestResult(results).then((data) => {
      setTestResults(data);
    });
  };

  const handleResetTest = () => {
    setTestResults(undefined);
    setTest(undefined);
    setStatus(RequestStatus.Undone);
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
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {test.title}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label={!testResults ? 'Тест' : 'Результаты теста'} />
          <Tab label="Текст урока" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Test
          results={testResults}
          test={test}
          checkTest={handleCheckTest}
          resetTest={handleResetTest}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
    </Container>
  );
}

export default Page;
