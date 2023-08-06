import { useEffect, useState } from 'react';
import storeService from '../services/StorageService';

const useTest = (testName, questionIds) => {
  const [values, setValues] = useState(storeService.getTestValues(testName) || {});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const isTestNotAnswered = questionIds.some((id) => !values[id] || !values[id].length);

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

    const valuesData = {
      ...values,
      [questionId]: updatedLetters,
    };

    storeService.setTestValues(testName, valuesData);
    setValues(valuesData);
  };

  const resetTest = () => {
    setValues({});
    storeService.setTestValues(testName, {});
  };

  return {
    valid,
    values,
    handleCheck,
    resetTest,
  };
};

export default useTest;
