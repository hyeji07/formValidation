//onChange 작성하는 동안 유효성검사를 하는 컴포넌트(API 통신 전)
import React, { forwardRef, useState, useRef } from 'react';

import { FormInterface } from '@interfaces/components/FormInterface';
import { useForm } from '@hooks/useForm';

import styled from '@emotion/styled';

const InputBox = styled.input(`&:focus{border:1px solid red;}`);

export default forwardRef(function Input(
  {
    title,
    type,
    value,
    name,
    placeholder,
    className,
    InputTitle,
    onChange,
    regexCheck,
    maxValue,
    defaultText,
    successText,
    errorText,
  }: FormInterface.InputRegexInterface,
  ref?: React.ForwardedRef<HTMLInputElement>
) {
  //
  const [isError, setIsError] = useState(true);
  const [helperText, setHelperText] = useState(defaultText);

  const { handleChange } = useForm();

  //유효성 검사 함수
  const handleChangeRegex = (
    e: React.ChangeEvent<HTMLInputElement>
    /* | React.ChangeEvent<HTMLTextAreaElement> */
  ) => {
    //input 값 변경 실시간 감지해주는 hook 받아오기
    onChange(e);
    /* console.log(e.target.value); */

    //최대값이 지정되어있는 경우 바로 無 return을 하여 value를 저장하지 않는다.
    if (maxValue && maxValue < e.target.value.length) {
      return e.target.value.slice(0, maxValue);
    }
    console.log(e.target.value);
    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === '') {
      setIsError(true);
      return setHelperText(defaultText);
    }

    if (regexCheck) {
      // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
      }
    }
  };

  return (
    <label>
      <p className={InputTitle}>{title}</p>
      <InputBox
        type={type}
        name={name}
        value={value}
        onChange={handleChangeRegex}
        placeholder={placeholder}
        ref={ref}
        className={className}
        maxLength={maxValue}
      />
      <p className={helperText}>{helperText}</p>
    </label>
  );
});
