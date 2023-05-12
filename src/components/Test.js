import React, {useEffect, useState} from 'react';
import mockTest from '../mock/test';
import {Box, Button, Checkbox, Container, List, ListItem, ListItemIcon, ListItemText, Typography,} from '@mui/material';
import mockQuestions from '../mock/question';

function Test() {
  const [test, setTest] = useState();

  useEffect(() => {
    const data = {
      ...mockTest,
      questions: mockQuestions,
    };
    setTest(data);
  }, []);

  if (!test) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box component="header" sx={{ mb: 4 }}>
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
      <List component="ul" sx={{ mb: 4 }}>
        {test.questions &&
          test.questions.map((question) => {
            return (
              <>
                <ListItem key={question.id} sx={{ p: 0, pb: 0.5 }}>
                  <ListItemText primary={question.wording} />
                </ListItem>
                <List
                  component="ul"
                  disablePadding
                  dense
                  sx={{ pl: 1, mb: 2.5 }}
                >
                  {Object.entries(question.options).map((value) => {
                    const [variant, text] = value;

                    return (
                      <ListItem key={variant} sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Checkbox size="small" />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            );
          })}
      </List>
      <Box>
        <Button variant="contained">Оправить на проверку</Button>
      </Box>
    </Container>
  );
}

export default Test;
