import React, { forwardRef } from 'react';

import { FormInterface } from '@interfaces/components/FormInterface';

export default forwardRef(function TextArea(
  {
    InputTitle,
    labelClassName,
    title,
    value,
    onChange,
    name,
    placeholder,
    className,
  }: FormInterface.TextAreaInterface,
  ref?: React.ForwardedRef<HTMLTextAreaElement> | undefined
) {
  return (
    <label className={labelClassName}>
      <p className={InputTitle}>{title}</p>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        className={className}
      />
    </label>
  );
});
