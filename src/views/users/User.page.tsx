// @flow
import * as React from 'react';
import {useState} from 'react';
import {Equipment} from "../../__generated__/graphql";
import {useTranslation} from "react-i18next";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Page} from "../../components";
import {Alert, Typography, Box, Button, Container, LinearProgress} from "@mui/material";
import {useQuery} from "@apollo/client";
import {USER_HOSPITALISATION_QUERY} from "../../services/graphql/users";
import {useHistory, useParams} from "react-router";


const UserPage = () => {

    const {t} = useTranslation();
    const params = useParams() as { userId: string };
    const {userId} = params;
    const history = useHistory();
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const [equipmentToDelete, setEquipmentToDelete] = useState<
        Equipment | undefined
    >();


    const {data, error, refetch, loading} = useQuery(
        USER_HOSPITALISATION_QUERY,
        {
            variables: {
                payload: {
                    userId,
                    page: paginationModel.page + 1,
                    limit: paginationModel.pageSize,
                }
            }
        }
    );

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'createdAt',
            renderCell: params => new Date(+params.row.createdAt).toLocaleString(),
            headerName: t('hospitalisation_createdAt'), width: 200},
        {field: 'endAt',
            renderCell: params => new Date(+params.row.endAt).toLocaleString(),
            headerName: t('hospitalisation_endAt'), width: 200},
        {field: 'bed',
            renderCell: params => params.row.bed.number,
            headerName: t('hospitalisation_bed'), width: 200},
    ];

    return (
        <Page title={t('')}>

            <Container maxWidth={'lg'} sx={{pt: 2}}>
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

                {data && data.hospitalisations?.count === 0 && (
                    <Alert severity={'info'}>{t('hospitalisation_empty')}</Alert>
                )}
                <Box my={2}>
                    <Box pb={2}>
                        <Typography variant={'h2'}>
                            {t('hospitalisation_title')}
                        </Typography>
                    </Box>
                    {
                        loading &&
                        <LinearProgress/>
                    }
                    <DataGrid
                        onCellClick={params => {
                            history.push(`/users/${userId}/${params.row.id}`);
                        }}
                        loading={loading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 15, 20]}
                        rowCount={data?.hospitalisations?.count ?? 0}
                        rows={data?.hospitalisations?.data ?? []}
                        columns={columns}
                    />
                </Box>
            </Container>
        </Page>
    );
};

export default UserPage