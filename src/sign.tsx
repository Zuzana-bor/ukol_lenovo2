import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import Login from './login';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Sign = () => {
  const [sign, setSign] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleClick = () => {
    setSign(!sign);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignExistingUser = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log(user);
      setAlertMessage('blahopřeji jste prihlasen');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorCode, errorMessage);
      setAlertMessage(errorMessage);
    }
  };

  return (
    <>
      {alertMessage && <Alert component="div">{alertMessage}</Alert>}
      {!sign ? (
        <>
          <Button onClick={handleClick}>Zaregistrovat se</Button>

          <Box>
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <OutlinedInput
                name="email"
                id="email"
                aria-describedby="my-helper-text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" onClick={handleSignExistingUser}>
              Log in
            </Button>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Sign;
