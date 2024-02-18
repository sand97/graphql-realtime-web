import * as React from 'react';
import {useRef} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,} from '@mui/material';
import ButtonLoading from '../../../components/ButtonLoading';
import {useTranslation} from 'react-i18next';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {FormikTextField} from 'components/fields/FormikTextField';
import useResponsive from '../../../hooks/useResponsive';
import {Bed} from '__generated__/graphql';
import {GlobalDialog} from "../../users/components/AddOrUpdateUser";
import {useCreateBed, useUpdateBed} from "../beds_hooks";


interface AddOrUpdateCategoryProps {
    initialValue?: Bed;
}

const AddOrUpdateBedDialog = (
    props: AddOrUpdateCategoryProps & GlobalDialog,
) => {
    const submitButton = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation();
    const mobile = useResponsive('down', 'sm');

    const [addMutation, {loading: loadingAdd}] = useCreateBed();
    const [updateMutation, {loading: loadingUpdate}] = useUpdateBed();
    const loading = loadingAdd || loadingUpdate;

    const validations = {
        level: Yup.number().required(t('global_field_require')),
        number: Yup.number().required(t('global_field_require')),
    };

    const onCompleted = () => {
        props.onClose();
        if (props?.refetch)
            props.refetch();
    }

    const handleSubmit = (values: any) => {
        let input = {
            ...values,
        };
        delete input.__typename
        if (typeof input.id !== 'undefined') {
            updateMutation({
                variables: {
                    input,
                },
                onCompleted,
            });
        } else {
            addMutation({variables: {input}, onCompleted});
        }
    };


    const initialValues: any = {
        ...(props.initialValue ?? {})
    }

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
                            ? 'bed_update_title'
                            : 'bed_add_title',
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
                                        type={'number'}
                                        label={t('bed_level')}
                                        name={'level'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        type={'number'}
                                        label={t('bed_number')}
                                        name={'number'}
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

export default AddOrUpdateBedDialog;
