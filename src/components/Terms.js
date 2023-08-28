import React from 'react';
import { List, ListItemText, ListItem } from '@mui/material';


function Terms({ data }) {
  const sortedData = data.sort((a, b) => a.term > b.term ? 1 : -1);

  return (
    <List dense={false}>
      {sortedData.map((item) => (
        <ListItem>
          <ListItemText primary={`${item.term} – ${item.definition}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default Terms;
