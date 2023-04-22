// classic : 없을시 focus

import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';
import Input from '@components/input/Input';

import '../login.scss';

const Login = () => {
  const { values, handleChange } = useForm({
    username: '',
    password: '',
  });

  const idInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values?.username) {
      alert('아이디를 입력해주세요');
      idInput.current?.focus();
    }
    if (!values?.password) {
      alert('비밀번호를 입력해주세요');
      passwordInput.current?.focus();
    }
    console.log(values);
  };

  return (
    <div className='formContainer'>
      <h3 className='formTitle'> Login </h3>
      <div className='formBox'>
        <form onSubmit={handleSubmit}>
          <Input
            title='id'
            type='text'
            name='username'
            value={values?.username}
            onChange={handleChange}
            placeholder='아이디를 입력하세요.'
            ref={idInput}
            className='input'
          />
          <Input
            title='password'
            type='password'
            name='password'
            value={values?.password}
            onChange={handleChange}
            placeholder='비밀번호를 입력하세요.'
            ref={passwordInput}
            className='input'
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

export default Login;
