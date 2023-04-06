// classic : 없을시 focus

import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';
import InputLoginOnchangeRegex from '@components/Input/InputLoginOnchangeRegex';

import '../login.scss';

const LoginOnchangeRegex = () => {
  const { values, handleChange } = useForm({
    username: '',
    password: '',
  });

  const idInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleOnChange = async (e: FormEvent<HTMLFormElement>) => {
    /*   e.preventDefault(); */

    if (!values.username) {
      alert('아이디를 입력해주세요');
      idInput.current?.focus();
    }
    if (!values.password) {
      alert('비밀번호를 입력해주세요');
      passwordInput.current?.focus();
    } else {
      alert('로그인에 실패했습니다.');
    }

    console.log(e);
  };

  return (
    <div className='loginContainer'>
      <h3 className='loginTitle'> Login </h3>
      <div className='loginBox'>
        <form onSubmit={handleOnChange}>
          <InputLoginOnchangeRegex
            title='id'
            type='text'
            name='username'
            value={values.username}
            onChange={handleChange}
            placeholder='아이디를 입력하세요.'
            ref={idInput}
            className='loginInput'
          />
          <InputLoginOnchangeRegex
            title='password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordInput}
            className='loginInput'
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
