import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "@mui/material";

function ExamsResultTable({ tests, results }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Имя, фамилия</TableCell>
            {tests.map(test => (
              <TableCell key={test._id} align="center">
                <Link
                  href={`https://daat-agency.netlify.app/exam/${test.links.permalink}`}
                  target="_blank"
                  >
                  {test.title}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => (
            <TableRow
              key={result.id}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0
                }
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{result.person}</TableCell>
              {tests.map(test => (
                <TableCell key={test._id} align="center">{result.data[test.links.permalink]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExamsResultTable;
