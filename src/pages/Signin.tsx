import React from 'react';
import InputField from '../components/InputField';
import Gumb from '../components/Gumb';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

const Signin = () => {
  return (
    <Container>
      <Typography variant="h2" color={'#141414'}>Sign in to your account</Typography>
      <InputField label="Name" /><InputField label="Surname" /><InputField label="E-mail" /><InputField label="Password" />
      <Gumb buttonText="Sign Up" variant="contained" />
    </Container>
  )
};

export default Signin;
