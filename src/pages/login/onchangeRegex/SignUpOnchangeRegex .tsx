//onChange 작성하는 동안 유효성검사를 하는 컴포넌트(API 통신 전)
//1.글자수 제한
//2.한글,영어,특수문자 조건에 따라 체크
//3.조건에 충족한 성공은 해당 스타일 적용(+아래 Text출력)
//4.Err일 경우에는 해당 스타일 적용(+아래 Text출력)
//5.모든 test통과시 submit버튼 활성화, 아닐시 비활성화

///naver 회원가입 참고로 구현중

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';

import InputSingUpOnchangeRegex from '@components/input/InputSingUpOnchangeRegex';
import regex from './regex';

import '../login.scss';

import SelectOptionMonth from '@components/selects/selectOptionMonth';
import SelectOptionGender from '@components/selects/selectOptionGender';

const SignUpOnchangeRegex = () => {
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
  //
  const pwRef = useRef<HTMLInputElement>(null);
  const confirmPwRef = useRef<HTMLInputElement>(null);

  //submit button 활성화여부
  const [isOn, setIsOn] = useState(false);
  const [confirm, setConfirm] = useState(false);
  //errText 변경
  const [otherErrText, setOtherErrText] = useState(false);

  //Input Value 실시간 반영
  const { values, handleChange } = useForm({
    id: '',
    password: '',
    passwordReconfirm: '',
    userName: '',
    birYear: '',
    birDay: '',
    email: '',
  });

  //현재 Target Input Value 실시간 감지 (target e 보내기 위해)
  const handleChangeTarget = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChange(e);

    //비밀번호 일치 확인
    const pwInput = pwRef.current.value; //비밀번호
    const confirmpwInput = confirmPwRef.current.value; //비밀번호 재확인
    const isMatch = pwInput === confirmpwInput;
    setConfirm(isMatch);

    if (pwInput && confirmpwInput) {
      if (isMatch) {
        setConfirm(true);
        /*  confirmPwRef.current.classList.remove('suceess'); */
      } else {
        setConfirm(false);
      }
    } else {
      setConfirm(false);
    }

    //
    /*    if (signUpPwInput.current.value !== reconfirmPwInput.current.value) {
      setConfirem('err');
      console.log(confirem);
      console.log(signUpPwInput.current.value);
      console.log(reconfirmPwInput.current.value);
    } else if (signUpPwInput === reconfirmPwInput) {
      setConfirem('success');
      console.log(confirem);
      console.log(signUpPwInput.current.value);
      console.log(reconfirmPwInput.current.value);
    } */
  };

  //regex test를 통과 안된 경우 submit button이 비활성화되도록 설정함. (추후추가 수정하기)
  const pwValue = String(values.password);
  useEffect(() => {
    //기존 공통사용으로 여러개였던 type을 regex test하기 위해선 String으로 바꿔줘야해서 형변환시킴
    const idValue = String(values.id);
    const pwValue = String(values.password);
    const emailValue = String(values.email);

    //&&는 차례대로 순서 작성해야 모든것이 적용되는것을 참고하기.
    if (
      regex.id.test(idValue) &&
      /*  regex.email.test(emailValue) && */
      regex.password.test(pwValue) &&
      confirm
    ) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [values]); //디펜더시는 values로 설정해야 input값이 작성중 바뀔때 실시간으로 감지되어 위 코드가 적용된다.

  /*  useEffect(() => {
    if (values.password === values.passwordReconfirm) {
      setConfirem('success');
    } else {
      setConfirem('err');
    }
  }, [values]); */

  /*  useEffect(() => {
    //생년월일 errText
    if (values.birYear || values.birDay) {
      const NumYear = Number(values.birYear);
      const NumDay = Number(values.birDay);

      if (NumYear === 0 || NumDay === 0) {
        setOtherErrText(true);
      } else {
        setOtherErrText(false);
      }
    }
  }, [values, otherErrText]); */

  return (
    <div className='formContainer'>
      <h3 className='formTitle'> </h3>
      <div className='formBox'>
        <form /* onSubmit={handleOnChange} */ className='signUpForm'>
          <InputSingUpOnchangeRegex
            title='아이디'
            type='text'
            name='id'
            value={values?.id}
            placeholder=''
            ref={idInput}
            className='input'
            labelClassName='label'
            onChange={handleChangeTarget}
            regexCheck={regex.id}
            maxValue={20}
            successText={'성공'}
            errorText={
              '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
            }
            helperTextClassName='helperText'
            required={true} //필수입력정보
          />

          <div className='pwContainer'>
            <InputSingUpOnchangeRegex
              title='비밀번호'
              type='password'
              name='password'
              value={values?.password}
              placeholder=''
              ref={pwRef}
              onChange={handleChangeTarget}
              labelClassName='label'
              className='input'
              maxValue={16}
              regexCheck={regex.password}
              successText={''}
              errorText={'8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'}
              helperTextClassName='helperText'
              required={true}
            />
          </div>

          <div className='pwContainer'>
            <InputSingUpOnchangeRegex
              title='비밀번호 재확인'
              type='password'
              name='passwordReconfirm'
              value={values?.passwordReconfirm}
              placeholder=''
              ref={confirmPwRef}
              onChange={handleChangeTarget}
              labelClassName='label'
              className='input'
              maxValue={16}
              /*  regexCheck={regex.password} */
              successText={''}
              errorText={'비밀번호가 일치하지 않습니다.'}
              confirm={confirm} //재확인 일치여부
              helperTextClassName='helperText'
              required={true}
            />
          </div>

          <div className='pwContainer'>
            <InputSingUpOnchangeRegex
              title='이름'
              type='text'
              name='userName'
              value={values?.userName}
              placeholder=''
              /* ref={userNameRef} */
              onChange={handleChangeTarget}
              labelClassName='label'
              className='input'
              maxValue={40}
              regexCheck={regex.userName}
              successText={''}
              errorText={
                '한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)'
              }
              helperTextClassName='helperText'
              required={true}
            />
          </div>

          {/* ing */}
          <div>
            <p>생년월일</p>
            <div className='birContainer'>
              <InputSingUpOnchangeRegex
                type='text'
                name='birYear'
                value={values?.birYear}
                placeholder='년(자)'
                /* ref={userNameRef} */
                onChange={handleChangeTarget}
                labelClassName='label'
                className='input'
                maxValue={4}
                regexCheck={regex.birYear}
                successText={''}
                errorText={'태어난 년도 4자리를 정확하게 입력하세요.'}
                helperTextClassName='helperText'
                /*   required={true} */
              />
              <SelectOptionMonth />
              <InputSingUpOnchangeRegex
                type='text'
                name='birDay'
                value={values?.birDay}
                placeholder='일'
                /* ref={userNameRef} */
                onChange={handleChangeTarget}
                labelClassName='label'
                className='input'
                maxValue={2}
                regexCheck={regex.birDay}
                successText={''}
                errorText={'태어난 일(날짜) 2자리를 정확하게 입력하세요.'}
                helperTextClassName='helperText'
                /*  required={true} */
              />
            </div>
          </div>

          <div className='selectContainer'>
            <p>성별</p>
            <SelectOptionGender />
          </div>

          <InputSingUpOnchangeRegex
            title='본인 확인 이메일(선택)'
            type='text'
            name='email'
            value={values?.email}
            placeholder='선택입력'
            ref={emailInput}
            className='input'
            labelClassName='label'
            onChange={handleChangeTarget}
            regexCheck={regex.email}
            maxValue={100}
            successText={'성공'}
            errorText={'이메일 주소를 다시 확인해주세요.'}
            helperTextClassName='helperText'
          />

          {/*   <InputOnchangeRegex
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
          /> */}

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
    </div>
  );
};

export default SignUpOnchangeRegex;
