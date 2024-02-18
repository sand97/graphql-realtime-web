import * as React from 'react';
import {useRef} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,} from '@mui/material';
import ButtonLoading from '../../../components/ButtonLoading';
import {useTranslation} from 'react-i18next';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {FormikTextField} from 'components/fields/FormikTextField';
import useResponsive from '../../../hooks/useResponsive';
import {Equipment} from '__generated__/graphql';
import {GlobalDialog} from "../../users/components/AddOrUpdateUser";
import {useCreateEquipment, useUpdateEquipment} from "../equipments_hooks";


interface AddOrUpdateCategoryProps {
    initialValue?: Equipment;
}

const AddOrUpdateBedDialog = (
    props: AddOrUpdateCategoryProps & GlobalDialog,
) => {
    const submitButton = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation();
    const mobile = useResponsive('down', 'sm');

    const [addMutation, {loading: loadingAdd}] = useCreateEquipment();
    const [updateMutation, {loading: loadingUpdate}] = useUpdateEquipment();
    const loading = loadingAdd || loadingUpdate;

    const validations = {
        name: Yup.string().required(t('global_field_require')),
        description: Yup.string().required(t('global_field_require')),
        serialNumber: Yup.number().required(t('global_field_require')),
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
            addMutation({variables: { input }, onCompleted});
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
                            ? 'equipment_update_title'
                            : 'equipment_add_title',
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
                                        label={t('equipment_name')}
                                        name={'name'}
                                    />
                                    <FormikTextField
                                        xs={12}
                                        label={t('equipment_description')}
                                        name={'description'}
                                        rows={3}
                                        multiline
                                    />
                                    <FormikTextField
                                        xs={12}
                                        type={'number'}
                                        label={t('equipment_serial_number')}
                                        name={'serialNumber'}
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
