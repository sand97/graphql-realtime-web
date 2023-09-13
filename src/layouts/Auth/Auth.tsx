import React, { Fragment } from 'react';
import styles from './Auth.module.css';

const Auth = (props: any) => {
  const { children } = props;
  return (
    <Fragment>
      <main className={styles.content}>{children}</main>
    </Fragment>
  );
};

export default Auth;
