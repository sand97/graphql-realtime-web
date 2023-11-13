// @flow
import * as React from 'react';
import { useRef } from 'react';
import { Box, Card, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'components/fields/FormikTextField';
import FormikAutocomplete from 'components/fields/FormikAutocomplete';
import { UserContext, UserContextType } from 'contexts/UserContext';
import ButtonLoading from 'components/ButtonLoading';
// import {useUpdateProfileUser} from "../logic/auth_hooks";

type Props = {};

const UpdateProfile = (props: Props) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const { auth } = React.useContext(UserContext) as UserContextType;
  // const [loading, mutation] = useUpdateProfileUser();

  const initialValues = {
    name: auth?.user?.name,
    surname: auth?.user?.surname,
    email: auth?.user?.email,
    // genre: {
    //     label: t(`user_form_${auth?.user?.genre}`),
    //     id: auth?.user?.genre,
    // },
    // role: {
    //     label: t(`user_role_${auth?.user?.role}`),
    //     id: auth?.user?.role,
    // },
  };

  const handleSubmit = (values: any) => {
    // mutation({
    //     ...values,
    //     "genre": values.genre.id,
    // });
  };

  return (
    <Card elevation={2}>
      <Typography sx={{ p: 2 }} variant={'h6'}>
        {' '}
        {t('update_profile_title')}
      </Typography>
      <Box mb={2}>
        <Divider />
      </Box>
      <Box p={2}>
        <Formik
          validate={(values: any) => {
            const errors: any = {};
            ['name', 'genre'].forEach((key) => {
              if (!values[key]) {
                errors[key] = t('login_page.field_require');
              }
            });
            return errors;
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={initialValues}
        >
          {({ setFieldTouched, handleSubmit, resetForm }) => (
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
                Object.keys(initialValues).forEach((field) => {
                  setFieldTouched(field, true);
                });
              }}
            >
              <Grid container spacing={2}>
                <FormikTextField
                  xs={12}
                  label={t('login_form_email')}
                  type={'text'}
                  disabled={true}
                  name={'email'}
                />
                <FormikTextField
                  xs={12}
                  label={t('user_head_name')}
                  type={'text'}
                  name={'name'}
                />
                <FormikTextField
                  xs={12}
                  label={t('user_head_surname')}
                  type={'text'}
                  name={'surname'}
                />
                <FormikAutocomplete
                  options={['MEN', 'WOMAN'].map((id) => ({
                    label: t(`user_form_${id}`),
                    id,
                  }))}
                  label={t('user_genre_title')}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                  }
                  xs={12}
                  name={'genre'}
                />

                <FormikAutocomplete
                  options={['ADMIN', 'MANAGER', 'CLIENT'].map((id) => ({
                    label: t(`user_role_${id}`),
                    id,
                  }))}
                  disabled
                  label={t('user_page_role')}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                  }
                  xs={12}
                  name={'role'}
                />

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

export default UpdateProfile;
