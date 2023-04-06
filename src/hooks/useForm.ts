import React, { useState } from 'react';

import { HooksInterface } from '@interfaces/HooksInterface';

//initialValues? :정규식사용하면서 기존값안보내서 ?붙임
export function useForm(initialValues?: HooksInterface.UseFormInterface) {
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
