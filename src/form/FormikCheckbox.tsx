// @flow
import * as React from 'react';
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
} from "@mui/material";
import {FormikFieldWrapper, FormikFieldWrapperProps} from "./FormikFieldWrapper";
import {useField} from "formik";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface FormikCheckboxProps extends Partial<FormControlProps>, FormikFieldWrapperProps {
    name: string
    label: string
    row?: boolean
    options: {
        value: string | number | boolean
        label: string
    }[]
}

export const FormikCheckbox = (props: FormikCheckboxProps) => {
    const {xs, md, lg, gridClassName,label, row,  options,  ...rest} = props;

    const [field, meta, helpers] = useField({
        name: props.name,
    });
    
    const value = React.useMemo(() => {
        return field.value || [];
    }, [field.value]);

    return (
        <FormikFieldWrapper xs={xs}
                            md={md}
                            lg={lg}
                            gridClassName={gridClassName}
        >
            <FormControl error={!!(meta.touched && meta.error)} {...rest}>
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup
                    onBlur={e => {
                        field.onBlur({
                            ...e,
                            target: {
                                ...e.target,
                                name: props.name,
                            },
                        });
                    }} row={row}>
                    {
                        options.map(option =>
                            <FormControlLabel
                                key={`${option.value}`}
                                label={option.label}
                                control={<Checkbox
                                    checked={value.includes(option.value)}
                                    onChange={e => {
                                        if (e.target.checked)
                                            helpers.setValue([...value, option.value])
                                        else
                                            helpers.setValue(value.filter((id: any) => id !== option.value))
                                    }}/>}/>)
                    }
                </FormGroup>
                {!!(meta.touched && meta.error) &&
                    <FormHelperText>{meta.touched && meta.error}</FormHelperText>}
            </FormControl>
        </FormikFieldWrapper>
    );
};