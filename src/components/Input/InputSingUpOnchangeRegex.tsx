//onChange 작성하는 동안 유효성검사를 하는 컴포넌트(API 통신 전)
import React, { forwardRef, useEffect, useState } from 'react';

import { FormInterface } from '@interfaces/components/FormInterface';

/* import styled from '@emotion/styled';

const InputBox = styled.input(`&:focus{border:1px solid #fd9797;}`); */

export default forwardRef(function InputSignUpOnchangeRegex(
  {
    title,
    type,
    name,
    value,
    placeholder,
    InputTitle,
    onChange,
    labelClassName,
    className,
    maxValue,
    regexCheck,
    successText,
    errorText,
    helperTextClassName,
    required,
    confirm,
  }: FormInterface.InputRegexInterface,
  ref?: React.ForwardedRef<HTMLInputElement>
) {
  const [isError, setIsError] = useState(''); //err 감지
  const [helperText, setHelperText] = useState(''); //아래 문구

  //유효성 검사 함수
  const handleChangeRegex = (
    e: React.ChangeEvent<HTMLInputElement>
    /* | React.ChangeEvent<HTMLTextAreaElement> */
  ) => {
    //input 값 변경 실시간 감지해주는 hook 받아오기
    onChange(e);

    /*  console.log(e.target.value); */

    //maxValue 최대값이 지정되어있는 경우 입력한 글자수(value.length)보다 작도록 Input Value글자수를 제한한다.
    //아래 Input에서 maxLength으로 글자수를 제한했는데 왜 또 하는가? => 숫자는 정상작동하지 않아 글자수를 넘거나 모바일기기마다 안될 수도 있어서 안전장치로 또 해줘야 한다.
    if (maxValue && maxValue < e.target.value.length) {
      e.target.value = e.target.value.slice(0, maxValue);
    }

    //필수정보가 공백일 경우
    if (e.target.value === '' && required === true) {
      setIsError('requiredErr');
      return setHelperText('필수 정보입니다.');
    }

    if (regexCheck) {
      // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다.
      if (regexCheck.test(e.target.value)) {
        setIsError('success');
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError('err');
        return setHelperText(errorText);
      }
    } //* test()메소드: 인수로 전달된 문자열에 특정 패턴과 일치하는 문자열이 있는지를 검색하여, 그 결과를 불리언 값으로 반환함.
  };

  //focus되었을때 필수정보 value값이 비어있는 경우
  const handleOnfocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    //필수정보가 공백일 경우
    if (e.target.value === '' && required === true) {
      setIsError('requiredErr');
      return setHelperText('필수 정보입니다.');
    }
  };

  //비밀번호 재확인 (useEffect를 사용해 value값,confirm이 바뀔때 helperText가 재랜더링되도록 해야함)
  useEffect(() => {
    if (type === 'password' && value !== '') {
      if (confirm === false) {
        setIsError('err');
        return setHelperText(errorText);
      } else if (confirm === true) {
        setIsError('success');
        return setHelperText(successText);
      }
    } //
  }, [helperText, value, confirm]); //디펜더시 중요

  return (
    <label
      className={
        labelClassName +
        (isError === 'err' || isError === 'requiredErr'
          ? `Err ${labelClassName}`
          : '') +
        (isError === 'success' ? `Success ${labelClassName}` : '')
      } //처음 기본, err시, 성공시 class분류
    >
      <p className={InputTitle}>{title}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChangeRegex}
        placeholder={placeholder}
        ref={ref}
        className={className}
        maxLength={maxValue} //글자 수 제한
        onInput={handleChangeRegex} //글자 수 제한
        onFocus={handleOnfocus}
      />

      {helperText && <p className='helperText'>{helperText}</p>}

      {/* 비밀번호 자물쇠 img */}
      {name === 'password' && (
        <p
          className={'pwImg' + (isError === 'success' ? 'Success pwImg' : '')}
        ></p>
      )}

      {/* 비밀번호 재확인 자물쇠 img */}
      {name === 'passwordReconfirm' && (
        <p className={'confirm' + (confirm ? 'Success confirm' : '')}></p>
      )}
    </label>
  );
});
