import { useEffect, useState } from 'react';

const useTest = (initialValues, questionIds) => {
  const [values, setValues] = useState(initialValues);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const isTestNotAnswered = questionIds.some(id => !values[id] || !values[id].length);

    setValid(!isTestNotAnswered);
  }, [values, questionIds]);

  const handleCheck = (questionId, letter, checked) => {
    const prevLetters = values[questionId];
    let updatedLetters;

    if (!values[questionId]) {
      updatedLetters = [letter];
    } else if (checked) {
      updatedLetters = [...prevLetters, letter];
    } else {
      updatedLetters = prevLetters.filter((l) => l !== letter);
    }

    setValues({
      ...values,
      [questionId]: updatedLetters,
    });
  };

  const resetTest = () => {
    setValues({});
  };

  return {
    valid,
    values,
    handleCheck,
    resetTest,
  };
};

export default useTest;
