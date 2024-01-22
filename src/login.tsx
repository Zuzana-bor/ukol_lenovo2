import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { provider } from './firebase';
import Alert from '@mui/joy/Alert';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User signed up:', user);
      setAlertMessage('blahopřeji jste zaregistrován');

      // You might want to redirect or perform other actions upon successful sign-up
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorCode, errorMessage);
      setAlertMessage(errorMessage);
    }
  };

  const handleSignUpGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
        } else {
          console.error('credential is null');
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box>
      {alertMessage && <Alert component="div">{alertMessage}</Alert>}
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
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
      <Button variant="contained" onClick={handleSignUp}>
        Log in
      </Button>
      <Button variant="contained" onClick={handleSignUpGoogle}>
        Log in by google
      </Button>
    </Box>
  );
};

export default Login;
