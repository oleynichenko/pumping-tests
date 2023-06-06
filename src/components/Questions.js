import React, { useState } from 'react';
import { Button, FormGroup, List, ListItem, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Option from './Option';
import useTest from '../hooks/useTest';

function Questions({
  questions = [],
  wrongAnsweredQuestionIds,
  onSubmit,
  onReset,
}) {
  const [checking, setChecking] = useState(false);

  const {
    palette: { error, grey },
  } = useTheme();

  const { valid, values, handleCheck, resetTest } = useTest(
    {},
    questions.map((q) => q.id)
  );

  const isTestChecked = !!wrongAnsweredQuestionIds;
  const isTestDisabled = isTestChecked || checking;

  const reset = () => {
    resetTest();
    onReset();
  };

  const handleSubmit = () => {
    setChecking(true);
    onSubmit(values).then(() => setChecking(false));
  };

  const getQuestionColor = (id) => {
    if (!wrongAnsweredQuestionIds) {
      return grey[700];
    }

    return wrongAnsweredQuestionIds.includes(id) ? error.light : grey[700];
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
                  const isOptionChecked =
                    !!optionsChecked && optionsChecked.includes(letter);

                  return (
                    <Option
                      key={letter}
                      text={text}
                      isChecked={!!isOptionChecked}
                      isDisabled={isTestDisabled}
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
      {isTestChecked && !checking ? (
        <Button variant="contained" onClick={reset}>
          Пересдать
        </Button>
      ) : (
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          disabled={!valid}
          loading={checking}
        >
          Оправить на проверку
        </LoadingButton>
      )}
    </>
  );
}

export default Questions;
