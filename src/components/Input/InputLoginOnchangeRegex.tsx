import React, { forwardRef } from 'react';

import { FormInterface } from '@interfaces/components/FormInterface';

import styled from '@emotion/styled';

const InputBox = styled.input(`&:focus{border:1px solid red;}`);

export default forwardRef(function Input(
  {
    title,
    type,
    value,
    onChange,
    name,
    placeholder,
    className,
    InputTitle,
    helperText,
  }: FormInterface.InputRegexInterface,
  ref?: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label>
      <p className={InputTitle}>{title}</p>
      <InputBox
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        className={className}
      />
      <p className={helperText}></p>
    </label>
  );
});
