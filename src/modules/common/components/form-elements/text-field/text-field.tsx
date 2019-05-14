import { Field } from 'formik';
import React from 'react';
import classNames from 'classnames';
import { FieldProps } from '../interfaces/field-props';

export const TextField: React.FC<FieldProps> = ({
  name,
  title,
  type,
  placeholder,
  error,
  touched,
  autoComplete
}) => (
  <div className="form-group">
    {title && <label>{title}</label>}
    <Field
      name={name}
      type={type}
      className={classNames('form-control', {
        'is-valid': touched && !error,
        'is-invalid': touched && !!error,
      })}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
    {error && touched ? <div className="invalid-feedback">{error}</div> : null}
  </div>
);
