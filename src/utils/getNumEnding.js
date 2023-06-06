const SCORE = [`балл`, `балла`, `баллов`];
const QUESTION = [`вопрос`, `вопроса`, `вопросов`];

const getNumEnding = (iNumber, aEndings) => {
  let sEnding;
  let i;

  if (iNumber % 1 !== 0) {
    sEnding = aEndings[1];
  } else {
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
      sEnding = aEndings[2];
    } else {
      i = iNumber % 10;

      switch (i) {
        case (1): sEnding = aEndings[0]; break;
        case (2):
        case (3):
        case (4): sEnding = aEndings[1]; break;
        default: sEnding = aEndings[2];
      }
    }
  }

  return sEnding;
};

export { SCORE, QUESTION, getNumEnding };