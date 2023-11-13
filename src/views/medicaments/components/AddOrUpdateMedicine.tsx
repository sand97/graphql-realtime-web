import * as React from 'react';
import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import ButtonLoading from '../../../components/ButtonLoading';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'components/fields/FormikTextField';
import useResponsive from '../../../hooks/useResponsive';
import FormikAutocomplete from 'components/fields/FormikAutocomplete';
import { ReactComponent as DeleteIcon } from 'assets/Delete.svg';
import { Category, Medicament } from '__generated__/graphql';
import { GlobalDialog } from '../../categories/components/AddOrUpdateCategory';
import FormikFileDropZones from '../../../components/fields/FormikFileDropZone';
import {
  useCreateMedicament,
  useUpdateMedicament,
} from 'views/medicaments/medicament_hooks';

interface AddOrUpdateCategoryProps {
  initialValue?: Medicament;
  categories: Category[];
}

const AddOrUpdateMedicamentDialog = (
  props: AddOrUpdateCategoryProps & GlobalDialog,
) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const mobile = useResponsive('down', 'sm');

  const [addMutation, loadingAdd] = useCreateMedicament();
  const [updateMutation, loadingUpdate] = useUpdateMedicament();
  const loading = loadingAdd || loadingUpdate;

  const validations = {
    name: Yup.string().required(t('global_field_require')),
    description: Yup.string().required(t('global_field_require')),
    image: Yup.mixed().required(t('global_field_require')),
    price: Yup.number()
      .min(1, t('minimum_one'))
      .required(t('global_field_require')),
    stock: Yup.number()
      .min(1, t('minimum_one'))
      .required(t('global_field_require')),
  };

  const handleSubmit = (values: any) => {
    const variables = {
      ...values,
      id: props.initialValue?.id,
      categoryId: values.category?.id,
      image: values.image?.file ?? values.image?.src,
    };
    if (typeof variables?.id !== 'undefined') {
      updateMutation({
        variables: {
          ...variables,
          id: variables.id,
        },
        onCompleted: props.onClose,
      });
    } else {
      addMutation({ variables, onCompleted: props.onClose });
    }
  };

  const initialValues = {
    ...(props.initialValue || {}),
    image: props.initialValue?.image ? { src: props.initialValue.image } : '',
    category: props?.initialValue
      ? {
          id: props.initialValue.categoryId,
          label: props.initialValue.category?.name,
        }
      : undefined,
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        fullScreen={mobile}
        maxWidth={'xs'}
      >
        <DialogTitle>
          {t(
            props.initialValue
              ? 'update_medicament_dialog_title'
              : 'add_medicament_dialog_title',
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            validationSchema={Yup.object().shape(validations)}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            initialValues={initialValues}
          >
            {({ setFieldTouched, handleSubmit }) => (
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                  Object.keys(validations).forEach((field) => {
                    setFieldTouched(field, true);
                  });
                }}
              >
                <Grid container spacing={2}>
                  <FormikTextField
                    xs={12}
                    label={t('medicament_name')}
                    name={'name'}
                  />
                  <FormikTextField
                    xs={12}
                    multiline
                    rows={1}
                    label={t('global_description')}
                    name={'description'}
                  />

                  <FormikTextField
                    xs={12}
                    type={'number'}
                    label={t('medicament_stock')}
                    name={'stock'}
                  />

                  <FormikTextField
                    xs={12}
                    type={'number'}
                    label={t('global_price_unit')}
                    name={'price'}
                  />

                  <FormikAutocomplete
                    options={props.categories.map(({ name: label, id }) => ({
                      label,
                      id,
                    }))}
                    label={t('medicament_category')}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    xs={12}
                    name={'category'}
                  />

                  <FormikFileDropZones
                    xs={12}
                    label={t('medicament_image')}
                    name={'image'}
                  />

                  <button
                    ref={submitButton}
                    style={{ display: 'none' }}
                    type={'submit'}
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions sx={{ px: 3 }}>
          <ButtonLoading
            size={'small'}
            loading={loading}
            onClick={() => {
              if (submitButton.current) submitButton.current.click();
            }}
          >
            {t(
              props.initialValue ? 'global_dialog_update' : 'global_dialog_add',
            )}
          </ButtonLoading>
          <Button
            size={'small'}
            onClick={() => props.onClose()}
            color={'secondary'}
          >
            {t('global_dialog_cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddOrUpdateMedicamentDialog;
