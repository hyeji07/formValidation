import React, { useState } from 'react';

import { HooksInterface } from '@interfaces/HooksInterface';

export function useForm(initialValues: HooksInterface.UseFormInterface) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange,
    setValues,
  };
}
