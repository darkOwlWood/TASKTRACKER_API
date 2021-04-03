import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

export const TextFieldWrapper = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <TextField
                {...field}
                {...props}
                label={label}
                variant="filled"
                error={Boolean(meta.touched && meta.error)}
                helperText={Boolean(meta.touched && meta.error) ? meta.error : ''}
            />
        </>
    );
}

export const DateTimePickerWrapper = ({ label, ...props }) => {
    
    const [field, meta, helpers] = useField(props);

    return (
        <>
            <DateTimePicker
                {...field}
                {...props}
                label={label}
                onChange={date => helpers.setValue(date)}
                format="MM/DD/YY HH:mm"
                error={Boolean(meta.touched && meta.error)}
                helperText={Boolean(meta.touched && meta.error) ? meta.error : ''}
            />
        </>
    );
}