// @flow
import * as React from 'react';
import {useState} from 'react';
import {useCategories} from '../categories/categories_hooks';
import {User} from '../../__generated__/graphql';
import {useTranslation} from 'react-i18next';
import {Page} from '../../components';
import {Alert, Box, Button, Container, Grid, InputAdornment, Stack, TextField,} from '@mui/material';
import {useDebounce} from '../../hooks/useDebounce';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import DialogConfirm from 'components/DialogConfirm';
import {useDeleteUser, useUsers} from "./users_hooks";
import AddOrUpdateUser from "./components/AddOrUpdateUser";

type Props = {};
const UsersPage = (props: Props) => {
    const [dialog, setDialog] = useState<
        { initialValue?: User } | undefined
    >();
    const {t} = useTranslation();
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 500);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const [userToDelete, setUserToDelete] = useState<
        User | undefined
    >();
    const [deleteMedicamentMutation, {loading: loadingDeleteUser}] =
        useDeleteUser();

    const {data, error, refetch, loading} = useUsers(
        paginationModel.page + 1,
        paginationModel.pageSize,
        debouncedKeyword,
    );

    const columns: GridColDef[] = [
        {field: 'name', headerName: t('user_name'), width: 150},
        {field: 'surname', headerName: t('user_surname'), width: 200},
        {field: 'email', headerName: t('user_email'), width: 200},
        {
            field: 'actions',
            headerName: t('global_actions'),
            width: 300,
            renderCell: (params) => {
                return (
                    <Stack spacing={2} direction={'row'}>
                        <Button
                            onClick={() =>
                                setDialog({initialValue: params.row as User})
                            }
                            variant={'contained'}
                            size={'small'}
                        >
                            {t('global_label_update')}
                        </Button>
                        <Button
                            onClick={() => setUserToDelete(params.row as User)}
                            variant={'contained'}
                            size={'small'}
                            color={'error'}
                            sx={{ml: 1}}
                        >
                            {t('global_dialog_delete')}
                        </Button>
                    </Stack>
                );
            },
        },
    ];

    return (
        <Page title={t('')}>
            <DialogConfirm
                open={!!userToDelete}
                loading={loadingDeleteUser}
                title={t('global_dialog_conf_title')}
                text={t('delete_user_conf', {
                    name: userToDelete?.name,
                })}
                onConfirmDialogClose={() => setUserToDelete(undefined)}
                onYesClick={() => {
                    if (userToDelete)
                        void deleteMedicamentMutation({
                            variables: { id: userToDelete.id},
                            onCompleted: () => setUserToDelete(undefined),
                        });
                }}
            />
            <Container maxWidth={'lg'} sx={{pt: 2}}>
                    <AddOrUpdateUser
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

                {data && data.users?.count === 0 && (
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
                            {t('user_add_title')}
                        </Button>
                    </Grid>
                </Grid>
                <Box my={2}>
                    <DataGrid
                        loading={loading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 15, 20]}
                        rowCount={data?.users?.count ?? 0}
                        rows={data?.users?.users ?? []}
                        columns={columns}
                    />
                </Box>
            </Container>
        </Page>
    );
};

export default UsersPage;
