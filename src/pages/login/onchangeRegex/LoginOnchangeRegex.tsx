//onChange 작성하는 동안 유효성검사를 하는 컴포넌트(API 통신 전)
//1.글자수 제한
//2.한글,영어,특수문자 조건에 따라 체크
//3.조건에 충족한 성공은 해당 스타일 적용(+아래 Text출력)
//4.Err일 경우에는 해당 스타일 적용(+아래 Text출력)
//5.모든 test통과시 submit버튼 활성화, 아닐시 비활성화

import { useEffect, useRef, useState } from 'react';
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

  //여기서 ref는 사용하진 않음
  const idInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  //submit button 활성화여부
  const [isOn, setIsOn] = useState(false);

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

  //regex test를 통과 안된 경우 submit button이 비활성화되도록 설정함.
  useEffect(() => {
    //기존 공통사용으로 여러개였던 type을 regex test하기 위해선 String으로 바꿔줘야해서 형변환시킴
    const usernameValue = String(values.username);
    const pwValue = String(values.password);
    const emailValue = String(values.email);

    //&&는 차례대로 순서 작성해야 모든것이 적용되는것을 참고하기.

    if (
      regex.nickname.test(usernameValue) &&
      regex.email.test(emailValue) &&
      regex.password.test(pwValue)
    ) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [values]); //디펜더시는 values로 설정해야 input값이 작성중 바뀔때 실시간으로 감지되어 위 코드가 적용된다.

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
            maxValue={16}
            regexCheck={regex.password}
            defaultText={'8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'}
            successText={'성공'}
            errorText={
              '8~16자 영문 대 소문자, 숫자, 특수문자를 사용했는지 확인해주세요.'
            }
            helperTextClassName='helperText'
          />

          {/* regex test 통과 안된 경우 submit button 비활성화되도록 설정*/}
          <div className={isOn === false ? 'submitBtn Err' : 'submitBtn'}>
            <SubmitBtn
              text='로그인'
              className='blueSubmitBtn'
              disabled={!isOn}
            />
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
