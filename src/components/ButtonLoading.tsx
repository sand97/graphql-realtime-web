import React, { forwardRef } from 'react';
import clsx from 'clsx';
import {makeStyles} from "@mui/styles";
import {Button, ButtonProps, CircularProgress} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

export interface ButtonPrimaryProps extends ButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

const ButtonLoading = forwardRef<any, ButtonPrimaryProps>((props, ref) => {
  const classes = useStyles();
  const { loading = false, disabled = false, ...rest } = props;
  return (
    <Button
      ref={ref}
      className={clsx(props.className, classes.wrapper)}
      disabled={disabled || loading}
      {...rest}>
      {props.children}
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Button>
  );
});

export default ButtonLoading;
