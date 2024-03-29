import {useMutation, useQuery} from '@apollo/client';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  USERS_QUERY
} from "../../services/graphql/users";

export const useUsers = (
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery(USERS_QUERY, {
    variables: {
      page,
      limit,
      keyword,
    },
  });
};


export const useCreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(CREATE_USER_MUTATION, {
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

export const useUpdateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();


  return useMutation(UPDATE_USER_MUTATION, {
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

export const useDeleteUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(DELETE_USER_MUTATION, {
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
