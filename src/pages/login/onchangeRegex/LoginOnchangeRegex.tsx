//onChange 작성하는 동안 유효성검사를 하는 컴포넌트(API 통신 전)
//1.글자수 제한
//2.한글인지 체크
//3.조건에 충족한 성공은 해당 스타일 적용(+아래 Text출력)
//3.Err일 경우에는 해당 스타일 적용(+아래 Text출력)

import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';

import InputOnchangeRegex from '@components/input/InputOnchangeRegex';
import regex from './regex';

import '../login.scss';

const LoginOnchangeRegex = () => {
  /*    if (!values.username) {
      alert('아이디를 입력해주세요');
      idInput.current?.focus();
    }
    if (!values.password) {
      alert('비밀번호를 입력해주세요');
      passwordInput.current?.focus();
    } else {
      alert('로그인에 실패했습니다.');
    }
    console.log(e); */

  const idInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  //Input Value 실시간 반영
  const { values, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
  });

  //현재 Target Input Value 실시간 감지 (target e 보내기 위해)
  const handleChangeTarget = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChange(e);
  };

  return (
    <div className='formContainer'>
      <h3 className='formTitle'> </h3>
      <div className='formBox'>
        <form /* onSubmit={handleOnChange} */>
          <InputOnchangeRegex
            title='id'
            type='text'
            name='username'
            value={values?.username}
            placeholder='이름을 입력하세요.'
            ref={idInput}
            className='input'
            labelClassName='label'
            onChange={handleChangeTarget}
            regexCheck={regex.nickname}
            maxValue={10}
            defaultText={'이름은 한글로 3자~10자 이하로 입력해주세요.'}
            successText={'성공'}
            errorText={'한글로 3자~10자 이하로 입력했는지 확인해주세요.'}
            helperTextClassName='helperText'
          />
          <InputOnchangeRegex
            title='email'
            type='input'
            name='email'
            value={values?.email}
            placeholder='이메일을 입력하세요.'
            ref={emailInput}
            onChange={handleChangeTarget}
            labelClassName='label'
            className='input'
            regexCheck={regex.email}
            defaultText={'이메일을 입력하세요.'}
            successText={'성공'}
            errorText={'이메일을 정확하게 작성했는지 확인해주세요.'}
            helperTextClassName='helperText'
          />
          <InputOnchangeRegex
            title='password'
            type='password'
            name='password'
            value={values?.password}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordInput}
            onChange={handleChangeTarget}
            labelClassName='label'
            className='input'
            maxValue={10}
            regexCheck={regex.password}
            defaultText={'비밀번호를 입력하세요.'}
            successText={'성공'}
            errorText={'한글 3글자 이상'}
            helperTextClassName='helperText'
          />
          <div className='submitBtn'>
            <SubmitBtn text='로그인' className='blueSubmitBtn' />
          </div>
        </form>
      </div>
      <p className='signUpTxt'>
        <Link to='/sign_up'>회원가입</Link>
      </p>
    </div>
  );
};

export default LoginOnchangeRegex;
