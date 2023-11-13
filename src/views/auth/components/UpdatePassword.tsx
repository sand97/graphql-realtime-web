// @flow
import * as React from 'react';
import { useRef, useState } from 'react';
import { Box, Card, Divider, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'components/fields/FormikTextField';
import { ButtonLoading } from 'components';
// import {useChangePasswordUser} from "../logic/auth_hooks";
import * as Yup from 'yup';

type Props = {};

const UpdatePassword = (props: Props) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  // const [loading, mutation] = useChangePasswordUser();
  const [showPassword, setShowPassword] = useState<any>({
    old_password: true,
    new_password: true,
    confirm_password: true,
  });

  const initialValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  const validations = {
    old_password: Yup.string().required(t('field_require')),
    new_password: Yup.string().required(t('field_require')),
    confirm_password: Yup.string()
      .required(t('field_require'))
      .oneOf([Yup.ref('new_password'), null], t('label_password_is_not_same')),
  };

  const handleSubmit = (values: any, resetForm: () => void) => {
    // mutation(values, resetForm);
  };

  return (
    <Card elevation={2}>
      <Typography sx={{ p: 2 }} variant={'h6'}>
        {' '}
        {t('update_password')}
      </Typography>
      <Box mb={2}>
        <Divider />
      </Box>
      <Box p={2}>
        <Formik
          validationSchema={Yup.object().shape(validations)}
          onSubmit={(values, formikHelpers) => {
            handleSubmit(values, formikHelpers.resetForm);
          }}
          initialValues={initialValues}
        >
          {({ setFieldTouched, handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
                Object.keys(initialValues).forEach((field) => {
                  setFieldTouched(field, true);
                });
              }}
            >
              <Grid container spacing={2}>
                {Object.keys(initialValues).map((name) => (
                  <FormikTextField
                    xs={12}
                    endIcon={
                      <IconButton
                        onClick={() => {
                          setShowPassword({
                            ...showPassword,
                            [name]: !showPassword[name],
                          });
                        }}
                      >
                        <img
                          src={`/icons/${
                            showPassword[name] ? 'Hide' : 'Show'
                          }.svg`}
                          alt=""
                        />
                      </IconButton>
                    }
                    type={showPassword[name] ? 'password' : 'text'}
                    placeholder={t('login_page.form_password')}
                    name={name}
                  />
                ))}
                <button
                  ref={submitButton}
                  type={'submit'}
                  style={{ display: 'none' }}
                />
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>

      <ButtonLoading
        sx={{ mt: 2 }}
        fullWidth
        // loading={loading}
        onClick={() => {
          if (submitButton.current) submitButton.current.click();
        }}
      >
        {t('global_dialog_update')}
      </ButtonLoading>
    </Card>
  );
};

export default UpdatePassword;
