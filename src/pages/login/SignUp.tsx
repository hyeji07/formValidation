import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@hooks/useForm';
import Input from '@components/input/Input';
import SubmitBtn from '@components/btns/SubmitBtn';
/* import { doSignUp } from '@services/LoginService'; */

import './login.scss';

const SignUp = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: '',
    username: '',
    password: '',
    passwordCheck: '',
  });
  const nameSignInUpInput = useRef<HTMLInputElement>(null);
  const idSignInUpInput = useRef<HTMLInputElement>(null);
  const passwordSignInUpInput = useRef<HTMLInputElement>(null);
  const passwordCheckSignInUpInput = useRef<HTMLInputElement>(null);

  const doSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: values?.name,
      username: values?.username,
      password: values?.password,
    };

    if (
      !values?.name ||
      !values?.username ||
      !values?.password ||
      !values?.passwordCheck
    ) {
      alert('가입 정보를 확인해주세요.');
    } else if (
      values.name &&
      values.username &&
      values.password !== values.passwordCheck
    ) {
      alert('비밀번호와 비밀번호 재확인이 다릅니다.');
    } else if (
      values.name &&
      values.username &&
      values.password === values.passwordCheck
    ) {
      /* const loginData = await doSignUp(body);
      if (loginData.data.code === 200) {
        navigate('/login');
        alert('가입이 완료되었습니다.');
      } */
    }
  };

  return (
    <div className='loginContainer'>
      <h3 className='loginTitle'>회원가입</h3>
      <div className='loginBox'>
        <form onSubmit={doSignup}>
          <Input
            title='name'
            type='text'
            name='name'
            value={values?.name}
            onChange={handleChange}
            placeholder='이름을 입력하세요.'
            ref={nameSignInUpInput}
            className='loginInput'
          />
          <Input
            title='id'
            type='text'
            name='username'
            value={values?.username}
            onChange={handleChange}
            placeholder='아이디를 입력하세요.'
            ref={idSignInUpInput}
            className='loginInput'
          />
          <Input
            title='password'
            type='password'
            name='password'
            value={values?.password}
            onChange={handleChange}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordSignInUpInput}
            className='loginInput'
          />
          <Input
            title='password 재확인'
            type='password'
            name='passwordCheck'
            value={values?.passwordCheck}
            onChange={handleChange}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordCheckSignInUpInput}
            className='loginInput'
          />
          <div className='loginBtn'>
            <SubmitBtn text='가입하기' className='blueSubmitBtn' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
