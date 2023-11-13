import React, { useState } from 'react';
import { ErrorHandler } from 'components';
import styles from './Application.module.css';
import Navbar from './components/Navbar';
import { Header } from './components/Header';
import { UserContext, UserContextType } from '../../contexts/UserContext';
import { useHistory } from 'react-router';

const Application = (props: any) => {
  const { children } = props;
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { auth } = React.useContext(UserContext) as UserContextType;
  const history = useHistory();

  const handleOpenMenu = () => {
    setMobileNavOpen(true);
  };
  const handleCloseMenu = () => {
    setMobileNavOpen(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.wrapper}>
          <Navbar open={isMobileNavOpen} onClose={handleCloseMenu} />
          <div className={styles.content}>
            <Header handleOpenMenu={handleOpenMenu} />
            <ErrorHandler>{children}</ErrorHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
