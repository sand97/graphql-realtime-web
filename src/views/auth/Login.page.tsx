// @flow
import * as React from 'react';
import { useState } from 'react';
import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import { FormikTextField } from 'components/fields/FormikTextField';
import ButtonLoading from 'components/ButtonLoading';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import * as Yup from 'yup';
import { usePasswordLoginUser } from './logic/auth_hooks';
import { ReactComponent as HideIcon } from 'assets/Hide.svg';
import { ReactComponent as ShowIcon } from 'assets/Show.svg';
import { ReactComponent as EmailIcon } from 'assets/Email.svg';
import { ReactComponent as LockIcon } from 'assets/lock.svg';

const classes: {
  [key: string]:
    | SystemStyleObject<Theme>
    | ((theme: Theme) => SystemStyleObject<Theme>);
} = {
  root: {
    height: '100vh',
    position: 'relative',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F6F6F2',
    alignItems: 'center',
    '& .banner': {
      position: 'fixed',
      zIndex: 1,
      left: '-48px',
      top: '-48px',
      minHeight: 'calc(100vh + 48px * 2)',
      minWidth: 'calc(100vw + 48px * 2)',
      objectFit: 'cover',
      filter: 'grayscale(10)',
      opacity: 0.03,
    },
    '& .form': {
      padding: 3,
    },
  },
  container: (theme) => ({
    position: 'relative',
    zIndex: 4,
    width: 350,
    padding: '24px 0',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    maxWidth: 'calc(100% - 32px)',
  }),
};

const LoginPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(true);
  const [handleLogin, loading] = usePasswordLoginUser();

  const validations = {
    email: Yup.string()
      .email(t('email_form_invalid'))
      .required(t('global_field_require')),
    password: Yup.string().required(t('global_field_require')),
  };

  const initialValue: any = {
    email: '',
    password: '',
  };

  return (
    <Page title={t('login_page_title')}>
      <Box sx={classes.root}>
        <img src="/pattern.svg" className={'banner'} alt="" />
        <Box sx={classes.container}>
          <Box pl={3} pb={3}>
            <Typography variant={'h6'}>{t('login_page_title')}</Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
              {t('login_page_form_subtitle')}
            </Typography>
          </Box>

          <Divider />
          <Formik
            initialValues={initialValue}
            validationSchema={Yup.object().shape(validations)}
            onSubmit={(variables) => handleLogin({ variables })}
          >
            {({ setFieldTouched, handleSubmit }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                  Object.keys(initialValue).forEach((field) => {
                    setFieldTouched(field, true);
                  });
                }}
                className={'form'}
              >
                <Grid container spacing={2}>
                  <FormikTextField
                    xs={12}
                    startIcon={<EmailIcon />}
                    placeholder={t('login_form_email')}
                    name={'email'}
                  />

                  <FormikTextField
                    xs={12}
                    startIcon={<LockIcon />}
                    endIcon={
                      <IconButton
                        onClick={() => {
                          setShowPassword((e) => !e);
                        }}
                      >
                        {showPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    }
                    type={showPassword ? 'password' : 'text'}
                    placeholder={t('login_form_password')}
                    name={'password'}
                  />

                  <Grid item xs={12}>
                    <ButtonLoading
                      fullWidth
                      loading={loading}
                      type={'submit'}
                      variant={'contained'}
                      color={'primary'}
                    >
                      {t('login_page_action')}
                    </ButtonLoading>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Page>
  );
};

export default LoginPage;
