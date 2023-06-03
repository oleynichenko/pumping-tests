import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

function Option({ text, isChecked, isDisabled, color, onCheck }) {
  return (
    <FormControlLabel
      sx={{
        '& .MuiFormControlLabel-label.Mui-disabled': {
          color,
        },
      }}
      label={text}
      control={
        <Checkbox
          sx={{
            '&.Mui-disabled': {
              color,
            },
          }}
          disabled={isDisabled}
          checked={isChecked}
          onChange={(e) => onCheck(e.target.checked)}
        />
      }
    />
  );
}

export default Option;
