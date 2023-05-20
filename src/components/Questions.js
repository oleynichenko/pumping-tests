import React from 'react';
import { FormGroup, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Option from './Option';

function Questions({
  questions = [],
  answers,
  wrongAnsweredQuestionIds = [],
  handleAnswer,
  isChecked,
  sx,
}) {
  const {
    palette: { success, error },
  } = useTheme();

  return (
    <List component="ul" sx={{ p: 0, ...sx }}>
      {questions.map((question) => {
        const questionColor = wrongAnsweredQuestionIds.includes(question.id)
          ? error.light
          : success.light;

        return (
          <ListItem
            key={question.id}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 0,
              pb: 0.5,
            }}
          >
            <ListItemText
              primary={question.wording}
              sx={{ ...(isChecked && { color: questionColor }) }}
            />
            <FormGroup
              sx={{
                alignItems: 'flex-start',
                pl: 2.5,
                mt: 0.5,
                mb: 2.5,
              }}
            >
              {Object.entries(question.options).map(([letter, text]) => (
                <Option
                  key={letter}
                  text={text}
                  color={questionColor}
                  isChecked={isChecked}
                  onCheck={handleAnswer}
                />
              ))}
            </FormGroup>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Questions;
