import { useCategories } from './categories_hooks';
import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Category } from '__generated__/graphql';
import AddOrUpdateCategoryDialog from './components/AddOrUpdateCategory';
import { Page } from 'components';

export default function CategoriesPage() {
  const [dialog, setDialog] = useState<
    { initialValue?: Category } | undefined
  >();
  const [keyword, setKeyword] = useState('');

  const { loading, data, error, refetch } = useCategories();

  const { t } = useTranslation();

  return (
    <Page title={t('navigation_config_category')}>
      <Container maxWidth={'lg'} sx={{ pt: 2 }}>
        <AddOrUpdateCategoryDialog
          initialValue={dialog?.initialValue}
          open={!!dialog}
          onClose={() => setDialog(undefined)}
        />
        {loading && !error && <LinearProgress />}
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

        {data && data.categories.length === 0 && (
          <Alert severity={'info'}>{t('categories_empty')}</Alert>
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
              fullWidth
              onClick={() => setDialog({})}
              startIcon={<img src="/icons/Add.svg" alt="" />}
            >
              {t('category_add_title')}
            </Button>
          </Grid>
        </Grid>

        <Grid sx={{ mt: 2 }} container spacing={2}>
          {((data?.categories as Category[]) || [])
            .filter((category) => {
              return [category.name, category.description]
                .join('')
                .toLowerCase()
                .includes(keyword.toLowerCase());
            })
            .map((category) => (
              <Grid item xs={'auto'} key={category.id}>
                <Button
                  onClick={() => setDialog({ initialValue: category })}
                  variant={'outlined'}
                  color={'info'}
                >
                  {category.name}
                </Button>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Page>
  );
}
