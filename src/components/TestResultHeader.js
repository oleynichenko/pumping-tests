import React from 'react';
import { Stack, Typography } from '@mui/material';
import getLevel from '../utils/getLevel';
import { getNumEnding, QUESTION, SCORE } from '../utils/getNumEnding';

function TestResultHeader({ title, result, levels, total }) {
  const { percentScored, pointsScored, possibleScore, rightAnswersQuantity } =
    result;
  const today = new Date().toLocaleDateString('ru-RU');
  const level = getLevel(levels, percentScored);
  const questionsWording = getNumEnding(total, QUESTION);
  const scoreWording = getNumEnding(pointsScored, SCORE);

  return (
    <>
      <Typography variant="overline">{`Результаты теста от ${today}`}</Typography>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Stack
        alignItems="center"
        sx={{ textAlign: 'center' }}
        color={level.color || 'inherit'}
      >
        {level && level.conclusionPhrase && (
          <Typography
            component="p"
            variant="h5"
            sx={{ textTransform: 'uppercase' }}
          >
            {level.conclusionPhrase}
          </Typography>
        )}
        <Typography component="p" variant="h1" fontWeight="400">
          {`${percentScored}%`}
        </Typography>
        <Typography component="p" variant="h5" sx={{ maxWidth: 700 }}>
          {`Вы правильно ответили на ${rightAnswersQuantity} из ${total} ${questionsWording} и набрали ${pointsScored} ${scoreWording} из
          ${possibleScore} возможных`}
        </Typography>
      </Stack>
      {level && level.feedback && (
        <Typography component="p" sx={{ mt: 2, textAlign: 'justify' }}>
          {level.feedback.data || level.feedback}
        </Typography>
      )}
    </>
  );
}

export default TestResultHeader;
