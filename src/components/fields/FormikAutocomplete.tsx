// @flow
import * as React from 'react';
import {
  Autocomplete,
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  TextField,
} from '@mui/material';
import {
  FormikFieldWrapper,
  FormikFieldWrapperProps,
} from './FormikFieldWrapper';
import { useField } from 'formik';
import { ChipTypeMap } from '@mui/material/Chip';
import { UseAutocompleteProps } from '@mui/base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface FormikAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    FormikFieldWrapperProps {
  name: string;
  fullWidth?: boolean;
  country?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  onChange?: undefined;
  uppercase?: boolean;
  label?: string;
  onValueChange?: (
    v:
      | (T | AutocompleteFreeSoloValueMapping<FreeSolo> | null | undefined)
      | (T | AutocompleteFreeSoloValueMapping<FreeSolo> | null | undefined)[],
  ) => void;
  placeholder?: string;
}

export default function FormikAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: FormikAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
): JSX.Element {
  const { xs, md, lg, gridClassName, onValueChange, ...rest } = props;

  const [field, meta, helpers] = useField({
    name: props.name,
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (props.freeSolo && !props.multiple) {
      helpers.setValue(value);
    }
    if (reason === 'input') {
      setInputValue(props.uppercase ? value.toUpperCase() : value);
    } else if (reason === 'reset' || reason === 'clear') {
      setInputValue(value);
    }
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (props.country && !field.value) fetchCountry();
  }, []);

  const fetchCountry = () => {
    fetch('https://ipapi.co/json/')
      .then(async (r) => {
        const { country_calling_code } = await r.json();
        const value = props.options.find(
          (o) => `+${(o as any).id}` === country_calling_code,
        );
        if (onValueChange) onValueChange(value);
        if (value) {
          helpers.setValue(value);
        }
      })
      .catch((e) => console.error('Unable to fetch default country'));
  };

  return (
    <FormikFieldWrapper xs={xs} md={md} lg={lg} gridClassName={gridClassName}>
      <Autocomplete
        {...rest}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus={rest.autoFocus}
            label={props.label}
            name={props.name}
            onBlur={(e) => {
              field.onBlur(e);
            }}
            placeholder={props.placeholder}
            fullWidth={props.fullWidth ?? true}
            error={!!(meta.touched && meta.error)}
            helperText={
              (meta.touched && meta.error) ??
              (props.multiple && props.freeSolo
                ? t('use_enter_to_add_item')
                : null)
            }
          />
        )}
        value={field.value || (props.multiple ? [] : null)}
        onInputChange={(event, value, reason) => {
          handleInputChange(event, value, reason);
        }}
        inputValue={inputValue}
        onChange={(e, value, reason, details) => {
          if (onValueChange) onValueChange(value);
          helpers.setValue(value);
        }}
        options={props.options}
        onBlur={(e) => {
          field.onBlur(e);
        }}
      />
    </FormikFieldWrapper>
  );
}
