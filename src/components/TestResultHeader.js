import React from 'react';
import { Stack, Typography } from '@mui/material';

const getLevel = () => {

};

function TestResultHeader({ title, result }) {
  const {percentScored, pointsScored, possibleScore, rightAnswersQuantity} = result;
  const today = new Date().toLocaleDateString('ru-RU');

  return (
    <>
      <Typography variant="overline">{`Результаты теста от ${today}`}</Typography>
      <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      <Stack
        alignItems="center"
        sx={{ textAlign: 'center' }}
        color="warning.light"
      >
        <Typography
          component="p"
          variant="h5"
          sx={{ textTransform: 'uppercase' }}
        >
          Уровень эксперта
        </Typography>
        <Typography component="p" variant="h1">
          {`${percentScored}%`}
        </Typography>
        <Typography component="p" variant="h5" sx={{ maxWidth: 700 }}>
          {`Вы правильно ответили на ${rightAnswersQuantity} из 12 вопросов и набрали ${pointsScored} балла из
          ${possibleScore} возможных`}
        </Typography>
      </Stack>
    </>
  );
}

export default TestResultHeader;
