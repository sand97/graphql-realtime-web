// @flow
import * as React from 'react';
import {
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import {
  FormikFieldWrapper,
  FormikFieldWrapperProps,
} from './FormikFieldWrapper';
import { useField } from 'formik';

interface FormikTextFieldProps
  extends Partial<OutlinedTextFieldProps>,
    FormikFieldWrapperProps {
  name: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const FormikTextField = (props: FormikTextFieldProps) => {
  const { xs, md, lg, gridClassName, startIcon, endIcon, ...rest } = props;

  const [field, meta, helpers] = useField({
    name: props.name,
  });

  return (
    <FormikFieldWrapper xs={xs} md={md} lg={lg} gridClassName={gridClassName}>
      <TextField
        {...rest}
        value={field.value ?? ''}
        fullWidth={props.fullWidth ?? true}
        variant={'outlined'}
        InputLabelProps={{ shrink: !!field.value }}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position={'start'}>{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position={'start'}>{endIcon}</InputAdornment>
          ) : undefined,
        }}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
          field.onChange(e);
        }}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e);
          field.onBlur(e);
        }}
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
      />
    </FormikFieldWrapper>
  );
};
