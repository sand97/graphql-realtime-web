import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Box, Button, FormHelperText, Theme, Typography } from '@mui/material';
import {
  FormikFieldWrapper,
  FormikFieldWrapperProps,
} from './FormikFieldWrapper';
import { useField } from 'formik';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { ReactComponent as DeleteIcon } from 'assets/Delete.svg';

export interface FileUploadType {
  src: string;
  file?: File;
  id: string;
}

const classes: {
  [key: string]:
    | SystemStyleObject<Theme>
    | ((theme: Theme) => SystemStyleObject<Theme>);
} = {
  dropZone: (theme) => ({
    border: `1px dashed ${theme.palette.secondary.main}`,
    padding: '16px 16px',
    outline: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      // backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer',
    },
  }),
  imgContainer: {
    display: 'flex',
    marginTop: 1,
    overflowX: 'auto',
  },
  imgItem: {
    marginRight: 1,
    height: 130,
    width: 130,
    minWidth: 130,
    overflow: 'hidden',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      backgroundColor: '#e5e5e5',
      border: '1px solid #e5e5e5',
    },
  },
  action: {
    position: 'absolute!important',
    bottom: 0,
    right: 0,
    minWidth: 42,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    backgroundColor: '#fff',
    '& svg': {
      marginTop: 0.5,
    },
    '& svg path': {
      stroke: (theme) => theme.palette.error.main,
    },
  },
  actionActive: {
    backgroundColor: (theme) => `${theme.palette.error.main}`,
    '& svg path': {
      stroke: '#fff',
    },
  },
  dragActive: {
    border: (theme) => `1px dashed ${theme.palette.primary.main}`,
    opacity: 0.5,
  },
};

export const isFileImage = (type: string) => {
  return [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'webp',
    'png',
    'jpg',
    'jpeg',
  ].includes(type);
};

interface AssetDropZones extends Partial<FormikFieldWrapperProps> {
  name: string;
  label?: string;
  onChange?: (values: FileUploadType) => void;
  onMultipleChange?: (values: FileUploadType[]) => void;
  value?: FileUploadType;
}

export default function FormikFileDropZones(props: AssetDropZones) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { xs, md, lg, gridClassName, ...rest } = props;

  const [imgIdToDelete, setImgIdToDelete] = useState<string[]>([]);

  const [field, meta, helpers] = useField<
    FileUploadType | FileUploadType[] | null
  >({
    name: props.name,
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.findIndex((file) => !isFileImage(file.type)) !== -1) {
        enqueueSnackbar(t('asset_drop_zone_file_error'), {
          variant: 'warning',
        });
      } else {
        helpers.setTouched(true);
        const date = new Date().getTime().toString();

        if (props.onMultipleChange) {
          let value: FileUploadType[] = acceptedFiles.map((file, index) => ({
            src: URL.createObjectURL(file),
            file: file,
            id: `${date}-${index}`,
          }));
          if (Array.isArray(field.value)) value = [...value, ...field.value];
          helpers.setValue(value);
          props.onMultipleChange(value);
        } else if (acceptedFiles.length > 0) {
          const value = {
            src: URL.createObjectURL(acceptedFiles[0]),
            file: acceptedFiles[0],
            id: date,
          };
          helpers.setValue(value);
          if (props.onChange) props.onChange(value);
        }
      }
    },
    [props.onChange, field.value],
  );

  const handleDeleteImage = (img: FileUploadType) => {
    if (imgIdToDelete.includes(img.id)) {
      if (field.value)
        if (Array.isArray(field.value)) {
          helpers.setValue(field.value.filter((i) => i.id !== img.id));
        } else {
          helpers.setValue(null);
        }
    } else {
      setImgIdToDelete([...imgIdToDelete, img.id]);
      setTimeout(
        () => setImgIdToDelete(imgIdToDelete.filter((id) => id !== img.id)),
        3000,
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <FormikFieldWrapper xs={xs} md={md} lg={lg} gridClassName={gridClassName}>
      <Box
        sx={[
          classes.dropZone,
          isDragActive && classes.dragActive,
          meta.error && meta.touched
            ? { border: (theme) => `1px dashed ${theme.palette.error.main}` }
            : {},
        ]}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          component={'div'}
          textAlign={'center'}
          zIndex={4}
          position={'relative'}
        >
          <React.Fragment>
            {props.label && (
              <Typography
                variant="body1"
                gutterBottom
                color={'common.black'}
                fontSize={'14px'}
                fontWeight={'700'}
              >
                {props.label}
              </Typography>
            )}
            <Typography color={'primary'} fontSize={'14px'} sx={{ mx: '10px' }}>
              {t(
                props.onMultipleChange
                  ? 'browser_multiple_file'
                  : 'browser_one_file',
              )}
              <Typography variant={'caption'} color={'text.disabled'}>
                (JPEG, PNG, WEBP, AVIF)
              </Typography>
            </Typography>
          </React.Fragment>
        </Box>
      </Box>
      {meta.touched && meta.error && (
        <FormHelperText error sx={{ my: 1 }}>
          {meta.error}
        </FormHelperText>
      )}
      <Box sx={classes.imgContainer}>
        {field.value &&
          (Array.isArray(field.value) ? field.value : [field.value]).map(
            (img) => (
              <Box sx={classes.imgItem} key={img.id}>
                <img src={img.src} alt="" />
                <Button
                  onClick={() => handleDeleteImage(img)}
                  size={'small'}
                  variant={
                    imgIdToDelete.includes(img.id) ? 'contained' : 'outlined'
                  }
                  color={'error'}
                  sx={[
                    classes.action,
                    imgIdToDelete.includes(img.id) && classes.actionActive,
                  ]}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ),
          )}
      </Box>
    </FormikFieldWrapper>
  );
}
