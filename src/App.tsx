import React, {useEffect} from 'react';
import './App.css';
import { apolloClient } from './services/graphql';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import SnackbarCloseButton from 'components/SnackbarCloseButton';
import ThemeProvider from 'theme';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from 'routes';
import 'translations';
import { ProgressBarStyle } from 'components/ProgressBar';
import ScrollToTop from 'components/ScrollToTop';
import { UserContextProvider } from './contexts/UserContext';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

const __DEV__ = process.env.NODE_ENV !== 'production';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <React.Fragment>
          <CssBaseline />
          <ProgressBarStyle />
          <UserContextProvider>
            <ScrollToTop />
            <ThemeProvider>
              {/* @ts-ignore*/}
              <Routes />
            </ThemeProvider>
          </UserContextProvider>
        </React.Fragment>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
