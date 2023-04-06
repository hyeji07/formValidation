// classic : 없을시 focus

import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';

import InputLoginOnchangeRegex from '@components/Input/InputLoginOnchangeRegex';
import regex from './regex';

import '../login.scss';

const LoginOnchangeRegex = () => {
  /*  const { values } = useForm({
    username: '',
    password: '',
  }); */

  const idInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  /*  for (const [key, value] of Object.entries(values)) {
    console.log(`${key}: ${value}`);

    const length = value?.length;
  } */

  /*   console.log(targetValue); */

  //console.log(values.username);

  /*   const [helperText, setHelperText] = useState(defaultText); */

  //const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  /*   e.preventDefault(); */

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

  //최대값이 지정되어있는 경우 바로 無 return을 하여 value를 저장하지 않는다.
  /*   if (maxValue && maxValue < e.target.value.length) return; */
  //  console.log();
  //};

  const { values, handleChange } = useForm({
    username: '',
    password: '',
  });
  /*  console.log(values); */

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <div className='loginContainer'>
      <h3 className='loginTitle'> Login </h3>
      <div className='loginBox'>
        <form /* onSubmit={handleOnChange} */>
          <InputLoginOnchangeRegex
            title='id'
            type='text'
            name='username'
            value={values?.username}
            placeholder='아이디를 입력하세요.'
            ref={idInput}
            className='loginInput'
            onChange={handlerChange}
            regexCheck={regex.nickname}
            maxValue={10}
            defaultText={'아이디를 입력하세요.'}
            successText={'성공'}
            errorText={'한글 3글자 이상'}
          />
          <InputLoginOnchangeRegex
            title='password'
            type='password'
            name='password'
            value={values?.password}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordInput}
            className='loginInput'
            onChange={handlerChange}
            regexCheck={regex.password}
            maxValue={10}
            defaultText={'비밀번호를 입력하세요.'}
            successText={'성공'}
            errorText={'한글 3글자 이상'}
          />
          <div className='loginBtn'>
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
