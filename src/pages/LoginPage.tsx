// LoginPage.tsx

import React, { useRef } from 'react';
import InputField from '../components/InputField';
import Gumb from '../components/Gumb';
import SocialMedia from '../components/SocialMedia';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleSignUp = () => {
    // Redirect to the signin page
    navigate('/signin');
  };

  return (
    <Container>
      <Typography variant="h2" color={'#141414'}>Login to your account</Typography>
      <SocialMedia />
      <InputField label="Username" inputRef={usernameRef} />
      <InputField label="Password" inputRef={passwordRef} />
      <Gumb buttonText="Log In" variant="contained" onClick={handleLogin} />
      <Gumb buttonText="Sign Up" variant="outlined" onClick={handleSignUp} /> {/* Change onClick to handleSignUp */}
    </Container>
  )
};

export default LoginPage;
