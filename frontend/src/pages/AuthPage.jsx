import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleSuccess = (response) => {
    console.log('Google login success:', response);
    // Handle Google login success (send token to backend)
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failure:', error);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
      />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;
