import { useMutation, useQuery } from '@apollo/client';
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from 'services/graphql/categories';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export const useCategories = () => {
  return useQuery(CATEGORIES_QUERY);
};

export const useCreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [mutation, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
        err.message ?? `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
    },
    update(cache, { data: result }) {
      if (!result?.createCategory) return;
      cache.updateQuery({ query: CATEGORIES_QUERY }, (data) => ({
        categories: [...(data?.categories ?? []), result?.createCategory],
      }));
    },
  });

  return [mutation, loading] as const;
};

export const useUpdateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [mutation, { loading }] = useMutation(UPDATE_CATEGORY_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
        err.message ?? `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: UPDATE_CATEGORY_MUTATION,
        data: data,
        variables: data?.updateCategory,
      });
    },
  });

  return [mutation, loading] as const;
};

export const useDeleteCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [mutation, { loading }] = useMutation(DELETE_CATEGORY_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
        err.message ?? `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
    },
    update(cache, { data }) {
      const id = cache.identify({
        id: data?.deleteCategory.id,
        __typename: 'Category',
      });
      cache.evict({ id });
    },
  });

  return [mutation, loading] as const;
};
