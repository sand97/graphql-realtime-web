import {useMutation, useQuery} from '@apollo/client';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import {
  CREATE_EQUIPMENT_MUTATION,
  DELETE_EQUIPMENT_MUTATION,
  UPDATE_EQUIPMENT_MUTATION,
  EQUIPMENTS_QUERY
} from "../../services/graphql/equipments";

export const useEquipments = (
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery(EQUIPMENTS_QUERY, {
    variables: {
      payload: {
        page,
        limit,
        keyword,
      }
    },
  });
};


export const useCreateEquipment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(CREATE_EQUIPMENT_MUTATION, {
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

export const useUpdateEquipment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();


  return useMutation(UPDATE_EQUIPMENT_MUTATION, {
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

export const useDeleteEquipment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return useMutation(DELETE_EQUIPMENT_MUTATION, {
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
