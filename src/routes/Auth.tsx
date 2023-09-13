import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {createStyles, makeStyles} from "@mui/styles";
import SecureLS from 'secure-ls';
import {LoadingScreen} from "../components";

const ls = new SecureLS({encodingType: 'aes'});
let token: undefined | string, user;

try {
  token = !!ls.get('token') ? ls.get('token') : undefined;
} catch (error) {
}


const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      a: {
        textDecoration: 'none!important'
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%'
      }
    }
  })
);

function Auth(props: any) {
  const {children} = props;
  const [isLoading, setLoading] = useState(false);
  const {t} = useTranslation();
  useStyles();
  // useEffect(() => {
  //   dispatch(setTranslationFunction(t));
  //   // dispatch(loadGlobalDataEffect());
  // }, [dispatch, t]);

  if (isLoading) {
    return <LoadingScreen isDashboard={true}/>;
  }

  return children;
}

export default Auth;
