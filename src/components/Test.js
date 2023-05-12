import React, { useEffect, useState } from 'react';
import mockTest from '../mock/test';
import {Typography} from "@mui/material";

function Test({}) {
  const [test, setTest] = useState();

  useEffect(() => {
    setTest(mockTest);
  }, []);

  if (!test) {
    return null;
  }

  return <Typography variant="h1">{test.title}</Typography>;
}

export default Test;
