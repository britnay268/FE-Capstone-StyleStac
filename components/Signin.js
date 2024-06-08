/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import Header from './Header';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center signIn-container"
    >
      <Header />
      <h1 style={{ color: '#B8A07F', fontSize: '50px' }}>Welcome to StyleStac!</h1>
      <img alt="StyleStac-logo" src="/app-logo.png" className="signIn-image" />
      <Button type="button" size="lg" className="signIn-button" onClick={signIn}>
        Login
      </Button>
    </div>
  );
}

export default Signin;
