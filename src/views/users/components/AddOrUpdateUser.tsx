import * as React from 'react';
import {useRef} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,} from '@mui/material';
import ButtonLoading from '../../../components/ButtonLoading';
import {useTranslation} from 'react-i18next';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {FormikTextField} from 'components/fields/FormikTextField';
import useResponsive from '../../../hooks/useResponsive';
import {User} from '__generated__/graphql';
import {useCreateUser, useUpdateUser} from "../users_hooks";
import FormikAutocomplete from "../../../components/fields/FormikAutocomplete";

export interface GlobalDialog {
    open: boolean
    onClose: () => void
    refetch?: () => void
}

interface AddOrUpdateCategoryProps {
    initialValue?: User;
}

const AddOrUpdateMedicamentDialog = (
    props: AddOrUpdateCategoryProps & GlobalDialog,
) => {
    const submitButton = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation();
    const mobile = useResponsive('down', 'sm');

    const [addMutation, {loading: loadingAdd}] = useCreateUser();
    const [updateMutation, {loading: loadingUpdate}] = useUpdateUser();
    const loading = loadingAdd || loadingUpdate;

    const validations = {
        email: Yup.string()
            .email(t('email_form_invalid'))
            .required(t('global_field_require')),
        ...(!props.initialValue ? {
            password: Yup.string().required(t('global_field_require')),
        } : {}),
        name: Yup.string().required(t('global_field_require')),
        surname: Yup.string().required(t('global_field_require')),
    };

    const onCompleted = () => {
        props.onClose();
        if (props?.refetch)
            props.refetch();
    }

    const handleSubmit = (values: any) => {
        let payload = {
            ...values,
            role: values.role.id,
        };
        delete payload.__typename
        delete payload.id
        if (typeof props.initialValue?.id !== 'undefined') {
            updateMutation({
                variables: {
                    payload,
                    userId: props.initialValue?.id,
                },
                onCompleted,
            });
        } else {
            addMutation({variables: {payload}, onCompleted});
        }
    };


    const initialValues: any = props.initialValue
        ? {
            ...props.initialValue,
            role: {
                label: t(`user_role_${props.initialValue?.role}`),
                id: props.initialValue?.role,
            },
        }
        : {
            name: '',
            surname: '',
            email: '',
            phone: '',
            role: {
                label: t(`user_role_CLIENT`),
                id: 'CLIENT',
            },
            password: '',
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
                            ? 'user_update_title'
                            : 'user_add_title',
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
                        {({setFieldTouched, handleSubmit}) => (
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
                                        label={t('user_name')}
                                        name={'name'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        label={t('user_surname')}
                                        name={'surname'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        label={t('user_email')}
                                        name={'email'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        label={t('user_phone')}
                                        name={'phone'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        label={t('user_password')}
                                        name={'password'}
                                    />

                                    <FormikAutocomplete
                                        options={['ADMIN', 'CLIENT'].map((id) => ({
                                            label: t(`user_role_${id}`),
                                            id,
                                        }))}
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
                                        style={{display: 'none'}}
                                        type={'submit'}
                                    />
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions sx={{px: 3}}>
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
