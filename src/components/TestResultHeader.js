import React from 'react';
import { Stack, Typography } from '@mui/material';

function TestResultHeader({ title }) {
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
          56.4%
        </Typography>
        <Typography component="p" variant="h5" sx={{ maxWidth: 700 }}>
          Вы правильно ответили на 11 вопросов из 12 и набрали 1.33 балла из
          11.6 возможных
        </Typography>
      </Stack>
    </>
  );
}

export default TestResultHeader;
