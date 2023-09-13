import React from 'react';
import './App.css';
import {apolloClient} from "./services/graphql";
import {ApolloProvider} from "@apollo/client";
import {SnackbarProvider} from "notistack";
import SnackbarCloseButton from 'components/SnackbarCloseButton';
import ThemeProvider from "theme";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "routes";
import "translations"
import Auth from "routes/Auth";
import {ProgressBarStyle} from "components/ProgressBar";
import ScrollToTop from 'components/ScrollToTop';
import {UserContextProvider} from "./contexts/UserContext";

function App() {
  return (
      <ApolloProvider client={apolloClient}>

      <SnackbarProvider
          action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey}/>}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
        <ThemeProvider>
            <UserContextProvider>
                <React.Fragment>
                    <CssBaseline/>
                    <ProgressBarStyle/>
                    <ScrollToTop/>
                    <Auth>
                        <Routes/>
                    </Auth>
                </React.Fragment>
            </UserContextProvider>
        </ThemeProvider>
      </SnackbarProvider>
      </ApolloProvider>
  );
}

export default App;
