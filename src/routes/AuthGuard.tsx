import React from 'react';
import { Redirect } from 'react-router-dom';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

function AuthGuard(props: any) {
  const { children } = props;

  let token: any;
  try {
    token = ls.get('token');
  } catch (error) {}
  if (!token) {
    return <Redirect to="/auth" />;
  }

  return children;
}

export default AuthGuard;
