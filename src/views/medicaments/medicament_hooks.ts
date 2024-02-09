import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_MEDICAMENT_MUTATION,
  DELETE_MEDICAMENT_MUTATION,
  MEDICAMENTS_QUERY,
  UPDATE_MEDICAMENT_MUTATION,
} from 'services/graphql/medicaments';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import BaseService from 'services/rest/BaseService';
import { AssetUrl } from 'services/rest/urls';
import { useState } from 'react';

export const useMedicatements = (
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery(MEDICAMENTS_QUERY, {
    variables: {
      page,
      limit,
      keyword,
    },
  });
};

function useUploadImage() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return async function upload(image: File) {
    const payload = new FormData();

    payload.append('image', image);

    const response = await BaseService.postFileRequest(
      AssetUrl.ADD_ASSET,
      payload,
      true,
    );

    if (response.status === 200 || response.status === 201) {
      return (await response.json()).image;
    } else {
      enqueueSnackbar(
        (await response.json().message) ??
          `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
      return null;
    }
  };
}

export const useCreateMedicament = () => {
  const { enqueueSnackbar } = useSnackbar();
  const uploadImage = useUploadImage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [mutation] = useMutation(CREATE_MEDICAMENT_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      setLoading(false);
      enqueueSnackbar(
        err.message ?? `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
    },
    update(cache, { data: result }) {
      setLoading(false);
      if (!result?.createMedicament) return;
      cache.updateQuery(
        {
          query: MEDICAMENTS_QUERY,
          variables: {
            page: 1,
            limit: 10,
            keyword: '',
          },
        },
        (data) => ({
          medicaments: {
            medicaments: [
              ...(data?.medicaments?.medicaments ?? []),
              result?.createMedicament,
            ],
            count: (data?.medicaments?.count ?? 0) + 1,
          },
        }),
      );
    },
  });

  async function mutateWithImage(
    // extend mutation variables function to accept image
    args: Parameters<typeof mutation>[0] & {
      variables: Parameters<typeof mutation>[0] & {
        image: File;
      };
    },
  ) {
    setLoading(true);
    const imageUrl = await uploadImage(args.variables.image);
    console.log(imageUrl);
    if (imageUrl) {
      args.variables.image = imageUrl;
      await mutation(args);
    } else {
      setLoading(false);
    }
  }

  return [mutateWithImage, loading] as const;
};

export const useUpdateMedicament = () => {
  const { enqueueSnackbar } = useSnackbar();
  const uploadImage = useUploadImage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [mutation] = useMutation(UPDATE_MEDICAMENT_MUTATION, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      setLoading(false);
      enqueueSnackbar(
        err.message ?? `${t('shared.internet_connexion_error')}`,
        {
          variant: 'error',
        },
      );
    },
    onCompleted: () => {
      setLoading(false);
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: UPDATE_MEDICAMENT_MUTATION,
        data: data,
        variables: data?.updateMedicament,
      });
    },
  });

  async function mutateWithImage(
    // extend mutation variables function to accept image
    args: Parameters<typeof mutation>[0] & {
      variables: Parameters<typeof mutation>[0] & {
        image: File | string;
      };
    },
  ) {
    setLoading(true);
    if (typeof args.variables.image !== 'string') {
      const imageUrl = await uploadImage(args.variables.image);
      if (imageUrl) {
        args.variables.image = imageUrl;
      }
    }
    await mutation(args);
  }

  return [mutateWithImage, loading] as const;
};

export const useDeleteMedicament = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [mutation, { loading }] = useMutation(DELETE_MEDICAMENT_MUTATION, {
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
        id: data?.deleteMedicament.id,
        __typename: 'Medicament',
      });
      cache.evict({ id });
    },
  });

  return [mutation, loading] as const;
};
