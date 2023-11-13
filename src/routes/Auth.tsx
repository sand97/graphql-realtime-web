import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });
let token: undefined | string, user;

try {
  token = !!ls.get('token') ? ls.get('token') : undefined;
} catch (error) {}

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      a: {
        textDecoration: 'none!important',
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  }),
);

function Auth(props: any) {
  const { children } = props;

  useStyles();

  return children;
}

export default Auth;
