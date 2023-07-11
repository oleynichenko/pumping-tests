import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useLogin from '../hooks/useLogin';

function Login({ onClose, onSubmit }) {
  const {
    isLoginDataValid,
    loginData,
    loginErrors,
    checkLoginData,
    resetLogin,
  } = useLogin();

  const handleClose = () => {
    resetLogin();
    onClose();
  };

  return (
    <Dialog
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 500,
        },
      }}
      open={true}
    >
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для сдачи экзамена введите свои данные
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
          required
          error={loginErrors.name}
          value={loginData.name}
          onChange={(e) => checkLoginData('name', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Фамилия"
          type="text"
          fullWidth
          variant="standard"
          required
          error={loginErrors.surname}
          value={loginData.surname}
          onChange={(e) => checkLoginData('surname', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Эл. почта"
          type="email"
          fullWidth
          variant="standard"
          required
          error={loginErrors.email}
          value={loginData.email}
          onChange={(e) => checkLoginData('email', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button
          onClick={() => onSubmit(loginData)}
          disabled={!isLoginDataValid}
        >
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Login;
