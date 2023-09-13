import {SnackbarKey, useSnackbar} from 'notistack';
import * as React from 'react';
import {IconButton} from "@mui/material";

function SnackbarCloseButton({ snackbarKey }: {snackbarKey: SnackbarKey}) {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <img src="/icons/close.svg" alt=""/>
        </IconButton>
    );
}

export default SnackbarCloseButton;