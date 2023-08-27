import React from 'react';
import { Typography } from '@mui/material';

function TestHeader({ title }) {
  return (
    <>
      {/*<Typography variant="overline">Тест</Typography>*/}
      <Typography component="h1" variant="h4" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="subtitle1">
        В одном вопросе может быть несколько правильных ответов. Правильные
        ответы повышают, а неправильные — уменьшают оценку. После проверки
        вопрос будет выделен красным, если вы указали хотя бы один лишний или не
        доуказали хотя бы один правильный ответ.
      </Typography>
    </>
  );
}

export default TestHeader;
