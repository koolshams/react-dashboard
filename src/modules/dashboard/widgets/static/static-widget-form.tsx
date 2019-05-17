import React from 'react';
import { WidgetFormProps } from '../../interfaces';
import { TextField } from '../../../common/components/form-elements/text-field/text-field';

export const StaticWidgetForm: React.FC<WidgetFormProps> = ({
  errors,
  touched,
}) => {
  return (
    <div>
      <TextField
        name="text"
        type="text"
        placeholder="Text"
        title="Text"
        error={errors.text}
        touched={touched.text}
      />{' '}
    </div>
  );
};
