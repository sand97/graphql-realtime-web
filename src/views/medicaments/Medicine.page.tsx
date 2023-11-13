// @flow
import * as React from 'react';
import { useCategories } from '../categories/categories_hooks';
import { useState } from 'react';
import { Category, Medicament } from '../../__generated__/graphql';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import AddOrUpdateMedicine from './components/AddOrUpdateMedicine';
import { useDebounce } from '../../hooks/useDebounce';
import { useDeleteMedicament, useMedicatements } from './medicament_hooks';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import format_price from 'utils/format_price';
import DialogConfirm from 'components/DialogConfirm';

type Props = {};
const MedicinePage = (props: Props) => {
  const [dialog, setDialog] = useState<
    { initialValue?: Medicament } | undefined
  >();
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [medicamentToDelete, setMedicamentToDelete] = useState<
    Medicament | undefined
  >();
  const [deleteMedicamentMutation, loadingDeleteMedicament] =
    useDeleteMedicament();

  const { data, error, refetch, loading } = useMedicatements(
    paginationModel.page + 1,
    paginationModel.pageSize,
    debouncedKeyword,
  );

  const { data: categoriesQuery } = useCategories();

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('global_name'), width: 150 },
    {
      field: 'category',
      valueGetter: (params) => {
        return (params.row as Medicament).category?.name;
      },
      headerName: t('medicament_category'),
      width: 150,
    },
    { field: 'description', headerName: t('global_description'), width: 200 },
    {
      field: 'price',
      headerName: t('global_price_unit'),
      valueGetter: (params) => {
        return format_price((params.row as Medicament).price);
      },
      width: 150,
    },
    { field: 'stock', headerName: t('medicament_stock'), width: 150 },
    {
      field: 'actions',
      headerName: t('global_actions'),
      width: 300,
      renderCell: (params) => {
        return (
          <Stack spacing={2} direction={'row'}>
            <Button
              onClick={() =>
                setDialog({ initialValue: params.row as Medicament })
              }
              variant={'contained'}
              size={'small'}
            >
              {t('global_label_update')}
            </Button>
            <Button
              onClick={() => setMedicamentToDelete(params.row as Medicament)}
              variant={'contained'}
              size={'small'}
              color={'error'}
              sx={{ ml: 1 }}
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
        open={!!medicamentToDelete}
        loading={loadingDeleteMedicament}
        title={t('global_dialog_conf_title')}
        text={t('delete_medicament_conf', {
          name: medicamentToDelete?.name,
        })}
        onConfirmDialogClose={() => setMedicamentToDelete(undefined)}
        onYesClick={() => {
          if (medicamentToDelete)
            void deleteMedicamentMutation({
              variables: { id: medicamentToDelete.id },
              onCompleted: () => setMedicamentToDelete(undefined),
            });
        }}
      />
      <Container maxWidth={'lg'} sx={{ pt: 2 }}>
        {categoriesQuery?.categories && (
          <AddOrUpdateMedicine
            initialValue={dialog?.initialValue}
            categories={categoriesQuery.categories as Category[]}
            open={!!dialog}
            onClose={() => setDialog(undefined)}
          />
        )}
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

        {data && data.medicaments?.count === 0 && (
          <Alert severity={'info'}>{t('medicaments_empty')}</Alert>
        )}
        <Grid
          sx={{ my: 0 }}
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
                    <img src="/icons/Search.svg" alt="" />
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
              disabled={categoriesQuery?.categories?.length === 0}
              fullWidth
              onClick={() => setDialog({})}
              startIcon={<img src="/icons/Add.svg" alt="" />}
            >
              {t('medicament_add_title')}
            </Button>
          </Grid>
        </Grid>
        <Box my={2}>
          <DataGrid
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 15, 20]}
            rowCount={data?.medicaments?.count ?? 0}
            rows={data?.medicaments?.medicaments ?? []}
            columns={columns}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default MedicinePage;
