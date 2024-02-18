import {useMutation, useQuery} from '@apollo/client';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import {
  CREATE_BED_MUTATION,
  DELETE_BED_MUTATION,
  UPDATE_BED_MUTATION,
  BEDS_QUERY
} from "../../services/graphql/beds";

export const useBeds = (
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery(BEDS_QUERY, {
    variables: {
      payload: {
        page,
        limit,
        keyword,
      }
    },
  });
};


export const useCreateBed = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(CREATE_BED_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
          err.message ?? `${t('shared.internet_connexion_error')}`,
          {
            variant: 'error',
          },
      );
    },
  })
};

export const useUpdateBed = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();


  return useMutation(UPDATE_BED_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
          err.message ?? `${t('shared.internet_connexion_error')}`,
          {
            variant: 'error',
          },
      );
    },
  })
};

export const useDeleteBed = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(DELETE_BED_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      enqueueSnackbar(
          err.message ?? `${t('shared.internet_connexion_error')}`,
          {
            variant: 'error',
          },
      );
    },
  })
};
