// @flow
import * as React from 'react';
import {useState} from "react";
import {Bed} from "../../__generated__/graphql";
import {useTranslation} from "react-i18next";
import {useDebounce} from "../../hooks/useDebounce";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Alert, Box, Button, Container, Grid, InputAdornment, LinearProgress, Stack, TextField} from "@mui/material";
import {Page} from "../../components";
import DialogConfirm from "../../components/DialogConfirm";
import AddOrUpdateBedDialog from "./components/AddOrUpdateBed";
import {useBeds, useDeleteBed} from "./beds_hooks";

const BedPage = () => {
    const [dialog, setDialog] = useState<
        { initialValue?: Bed } | undefined
    >();
    const {t, i18n: {language}} = useTranslation();

    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 500);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const [bedToDelete, setBedToDelete] = useState<
        Bed | undefined
    >();
    const [deleteMutation, {loading: loadingDeleteBed}] =
        useDeleteBed();

    const {data, error, refetch, loading} = useBeds(
        paginationModel.page + 1,
        paginationModel.pageSize,
        debouncedKeyword,
    );

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'level', headerName: t('bed_level'), width: 200},
        {field: 'number', headerName: t('bed_number'), width: 200},
    ];

    return (
        <Page title={t('')}>
            <DialogConfirm
                open={!!bedToDelete}
                loading={loadingDeleteBed}
                title={t('global_dialog_conf_title')}
                text={t('delete_bed_conf', {
                    name: bedToDelete?.number,
                })}
                onConfirmDialogClose={() => setBedToDelete(undefined)}
                onYesClick={() => {
                    if (bedToDelete)
                        void deleteMutation({
                            variables: { id: bedToDelete.id},
                            onCompleted: () => setBedToDelete(undefined),
                        });
                }}
            />
            <Container maxWidth={'lg'} sx={{pt: 2}}>
                <AddOrUpdateBedDialog
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

                {data && data.beds?.count === 0 && (
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
                            {t('bed_add_title')}
                        </Button>
                    </Grid>
                </Grid>
                <Box my={2}>
                    {
                        loading &&
                        <LinearProgress/>
                    }
                    <DataGrid
                        loading={loading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 15, 20]}
                        rowCount={data?.beds?.count ?? 0}
                        rows={data?.beds?.data ?? []}
                        columns={columns}
                    />
                </Box>
            </Container>
        </Page>
    );
};

export default BedPage