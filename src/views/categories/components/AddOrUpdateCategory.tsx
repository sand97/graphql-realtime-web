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
import DialogConfirm from '../../../components/DialogConfirm';
import { ReactComponent as DeleteIcon } from 'assets/Delete.svg';
import { Category } from '../../../__generated__/graphql';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../categories_hooks';

export interface GlobalDialog {
  open: boolean;
  onClose: () => void;
}

interface AddOrUpdateCategoryProps extends GlobalDialog {
  initialValue?: Category;
  parent?: Category;
}

const AddOrUpdateCategoryDialog = (props: AddOrUpdateCategoryProps) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const mobile = useResponsive('down', 'sm');

  const [addMutation, loadingAdd] = useCreateCategory();
  const [updateMutation, loadingUpdate] = useUpdateCategory();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMutation, loadingDelete] = useDeleteCategory();

  const loading = loadingAdd || loadingUpdate;

  const validations = {
    name: Yup.string().required(t('global_field_require')),
    description: Yup.string().required(t('global_field_require')),
  };

  const initialValues = {
    name: props.initialValue?.name || '',
    description: props.initialValue?.description || '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    const variables = {
      ...values,
      id: props.initialValue?.id,
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
            props.initialValue ? 'category_update_title' : 'category_add_title',
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            validationSchema={Yup.object().shape(validations)}
            onSubmit={(values, formikHelpers) => {
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
                    autoFocus={true}
                    label={t('global_name')}
                    name={'name'}
                  />
                  <FormikTextField
                    xs={12}
                    multiline
                    rows={3}
                    label={t('global_description')}
                    name={'description'}
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
          {props.initialValue && (
            <Box flexGrow={1}>
              <Button
                onClick={() => setDeleteDialogOpen(true)}
                size={'small'}
                variant={'outlined'}
                color={'error'}
              >
                <DeleteIcon />
              </Button>
            </Box>
          )}
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
      <DialogConfirm
        open={deleteDialogOpen}
        loading={loadingDelete}
        title={t('global_dialog_conf_title')}
        text={t('delete_category_conf', {
          name: props?.initialValue?.name,
        })}
        onConfirmDialogClose={() => setDeleteDialogOpen(false)}
        onYesClick={() => {
          if (props.initialValue?.id)
            void deleteMutation({
              variables: { id: props.initialValue.id },
              onCompleted: () => {
                setDeleteDialogOpen(false);
                props.onClose();
              },
            });
        }}
      />
    </React.Fragment>
  );
};

export default AddOrUpdateCategoryDialog;
