import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

function Option({ text, color, isChecked, onCheck }) {
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
          disabled={isChecked}
          // checked={true}
          onChange={onCheck}
          name="variant"
        />
      }
    />
  );
}

export default Option;
