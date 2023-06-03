import React from 'react';
import { Button, FormGroup, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Option from './Option';
import useTest from '../hooks/useTest';

function Questions({
  questions = [],
  wrongAnsweredQuestionIds,
  onSubmit,
  onReset,
}) {
  const {
    palette: { success, error },
  } = useTheme();
  const { valid, values, handleCheck, resetTest } = useTest(
    {},
    questions.map((q) => q.id)
  );
  console.log('values', values);
  const isTestChecked = !!wrongAnsweredQuestionIds;

  const reset = () => {
    resetTest();
    onReset();
  };

  const getQuestionColor = (id) => {
    if (!wrongAnsweredQuestionIds) {
      return 'inherit';
    }

    return wrongAnsweredQuestionIds.includes(id) ? error.light : success.light;
  };

  return (
    <>
      <List component="ul" sx={{ p: 0, mb: 4 }}>
        {questions.map((question) => {
          const questionColor = getQuestionColor(question.id);
          const optionsChecked = values[question.id];

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
                sx={{ ...(isTestChecked && { color: questionColor }) }}
              />
              <FormGroup
                sx={{
                  alignItems: 'flex-start',
                  pl: 2.5,
                  mt: 0.5,
                  mb: 2.5,
                }}
              >
                {Object.entries(question.options).map(([letter, text]) => {
                  const isOptionChecked = !!optionsChecked && optionsChecked.includes(letter);
                  console.log(question.id, letter, isOptionChecked);
                  return (
                    <Option
                      key={letter}
                      text={text}
                      isChecked={!!isOptionChecked}
                      isDisabled={isTestChecked}
                      color={questionColor}
                      onCheck={(checked) =>
                        handleCheck(question.id, letter, checked)
                      }
                    />
                  );
                })}
              </FormGroup>
            </ListItem>
          );
        })}
      </List>
      {!isTestChecked ? (
        <Button variant="contained" onClick={() => onSubmit(values)} disabled={!valid}>
          Оправить на проверку
        </Button>
      ) : (
        <Button variant="contained" onClick={reset}>
          Пересдать
        </Button>
      )}
    </>
  );
}

export default Questions;
