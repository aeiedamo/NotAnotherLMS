import React from 'react';
import { Box, Button, Heading } from '@primer/react';

const AuthPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Heading as="h1" mb={3}>Login</Heading>
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
    </Box>
  );
};

export default AuthPage;
