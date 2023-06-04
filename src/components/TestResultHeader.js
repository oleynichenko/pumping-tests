import React from 'react';
import { Stack, Typography } from '@mui/material';

const getLevel = (levels, percentScored) => {
  return levels.some(level => level.min >= percentScored && percentScored < level.max);
};

function TestResultHeader({ title, result, levels }) {
  const { percentScored, pointsScored, possibleScore, rightAnswersQuantity } =
    result;
  const today = new Date().toLocaleDateString('ru-RU');
  const { conclusionPhrase } = getLevel(levels, pointsScored);

  return (
    <>
      <Typography variant="overline">{`Результаты теста от ${today}`}</Typography>
      <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      <Stack
        alignItems="center"
        sx={{ textAlign: 'center' }}
        color={ percentScored >= 95 ? 'warning.light' : 'inherit'}
      >
        {conclusionPhrase && (
          <Typography
            component="p"
            variant="h5"
            sx={{ textTransform: 'uppercase' }}
          >
            {conclusionPhrase}
          </Typography>
        )}
        <Typography component="p" variant="h1" fontWeight='400'>
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
