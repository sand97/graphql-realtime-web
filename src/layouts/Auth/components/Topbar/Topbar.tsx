import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@mui/material';
import { Logo } from 'components';
import styles from './Topbar.module.css';

const Topbar = () => {
  return (
    <AppBar className={clsx(styles.root)} color="primary">
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
