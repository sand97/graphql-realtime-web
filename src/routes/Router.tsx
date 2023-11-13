// @flow
import * as React from 'react';
import SecureLS from 'secure-ls';
import { Redirect } from 'react-router-dom';
import { User } from '../views/auth/logic/auth_types';
const ls = new SecureLS({ encodingType: 'aes' });

type Props = {};
const Router = (props: Props) => {
  let token: string | undefined, user: User | undefined;

  try {
    token = !!ls.get('token') ? ls.get('token') : undefined;
    user = !!ls.get('user') ? ls.get('user') : undefined;
  } catch (error) {}

  let route = '/auth/login';

  if (token && user) {
    route = '/';
  }

  return <Redirect to={route} />;
};

export default Router;
