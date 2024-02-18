// @flow
import * as React from 'react';
import {useState} from "react";
import {Equipment} from "../../__generated__/graphql";
import {useTranslation} from "react-i18next";
import {useDebounce} from "../../hooks/useDebounce";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Page} from "../../components";
import DialogConfirm from "../../components/DialogConfirm";
import {Alert, Box, Button, Container, Grid, InputAdornment, TextField} from "@mui/material";
import {useDeleteEquipment, useEquipments} from "./equipments_hooks";
import AddOrUpdateEquipment from "./components/AddOrUpdateEquipment";


const EquipmentsPage = () => {
    const [dialog, setDialog] = useState<
        { initialValue?: Equipment } | undefined
    >();
    const {t} = useTranslation();
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 500);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const [equipmentToDelete, setEquipmentToDelete] = useState<
        Equipment | undefined
    >();
    const [deleteMutation, {loading: loadingDeleteEquipment}] =
        useDeleteEquipment();

    const {data, error, refetch, loading} = useEquipments(
        paginationModel.page + 1,
        paginationModel.pageSize,
        debouncedKeyword,
    );

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'name', headerName: t('equipment_name'), width: 200},
        {field: 'serialNumber', headerName: t('equipment_description'), width: 200},
    ];

    return (
        <Page title={t('')}>
            <DialogConfirm
                open={!!equipmentToDelete}
                loading={loadingDeleteEquipment}
                title={t('global_dialog_conf_title')}
                text={t('delete_user_conf', {
                    name: equipmentToDelete?.name,
                })}
                onConfirmDialogClose={() => setEquipmentToDelete(undefined)}
                onYesClick={() => {
                    if (equipmentToDelete)
                        void deleteMutation({
                            variables: { id: equipmentToDelete.id},
                            onCompleted: () => setEquipmentToDelete(undefined),
                        });
                }}
            />
            <Container maxWidth={'lg'} sx={{pt: 2}}>
                <AddOrUpdateEquipment
                    refetch={refetch}
                    initialValue={dialog?.initialValue}
                    open={!!dialog}
                    onClose={() => setDialog(undefined)}
                />
                {error && (
                    <Alert
                        action={
                            <Button
                                variant={'text'}
                                color="error"
                                size="small"
                                onClick={() => refetch()}
                            >
                                {t('common_retry')}
                            </Button>
                        }
                        severity={'error'}
                    >
                        {error.message}
                    </Alert>
                )}

                {data && data.equipments?.count === 0 && (
                    <Alert severity={'info'}>{t('medicaments_empty')}</Alert>
                )}
                <Grid
                    sx={{my: 0}}
                    container
                    spacing={2}
                    justifyContent={'space-between'}
                >
                    <Grid item xs={12} sm={'auto'}>
                        <TextField
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        <img src="/icons/Search.svg" alt=""/>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                minWidth: 250,
                                width: {
                                    xs: '100%',
                                    sm: 300,
                                },
                            }}
                            placeholder={t('global_search_hint')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={'auto'}>
                        <Button
                            fullWidth
                            onClick={() => setDialog({})}
                            startIcon={<img src="/icons/Add.svg" alt=""/>}
                        >
                            {t('equipment_add_title')}
                        </Button>
                    </Grid>
                </Grid>
                <Box my={2}>
                    <DataGrid
                        loading={loading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 15, 20]}
                        rowCount={data?.equipments?.count ?? 0}
                        rows={data?.equipments?.data ?? []}
                        columns={columns}
                    />
                </Box>
            </Container>
        </Page>
    );
};

export default EquipmentsPage