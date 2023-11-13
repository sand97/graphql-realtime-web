import React, { FunctionComponent, ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ButtonLoading from './ButtonLoading';

interface DialogConfirmInterface {
  open: boolean;
  onConfirmDialogClose?: Function;
  text?: ReactNode | string;
  loading?: boolean;
  title?: string;
  onYesClick: Function;
}

const ConfirmationDialog: FunctionComponent<DialogConfirmInterface> = ({
  open,
  onConfirmDialogClose = () => {},
  text = '',
  loading = false,
  title = 'Confirmation',
  onYesClick = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={() => onConfirmDialogClose()}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color={'text.primary'}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonLoading
          loading={loading}
          color={'error'}
          onClick={() => onYesClick()}
          variant="contained"
        >
          <>{t('global_confirm_delete')}</>
        </ButtonLoading>
        <Button
          onClick={() => onConfirmDialogClose()}
          variant="outlined"
          color={'secondary'}
          disabled={loading}
        >
          <>{t('global_label_cancel')}</>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
