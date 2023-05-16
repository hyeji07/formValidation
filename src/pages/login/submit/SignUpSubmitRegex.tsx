//submit버튼 유효성검사를 하는 컴포넌트(API 통신 전)
//1.글자수 제한
//2.한글,영어,특수문자 조건에 따라 체크
//3.조건에 충족한 성공은 해당 스타일 적용(+아래 Text출력)
//4.Err일 경우에는 해당 스타일 적용(+아래 Text출력)
//5.모든 test통과시 submit버튼 활성화, 아닐시 비활성화

///naver 회원가입 참고로 구현중

import { useEffect, useRef, useState } from 'react';

import { useForm } from '@hooks/useForm';
import SubmitBtn from '@components/btns/SubmitBtn';
import InputSignUpSubmitRegex from '@components/input/InputSignUpSubmitRegex';
import regex from './regex';
import SelectOptionMonth from '@components/selects/SelectOptionMonth';
import SelectOptionClassic from '@components/selects/SelectOptionClassic';
import { selectGenderLists } from '@components/selects/selectOption';
import { selectPhoneLists } from '@components/selects/selectOption';
import HomeLinkBtn from '@components/btns/HomeLinkBtn';

import '../login.scss';

interface SelectOptionsInterface {
  birMonth?: string;
  gender?: string;
  phoneFirst?: string;
}

interface HelperTextInterface {
  birTotal?: string;
  gender?: string;
  phone?: string;
}

const SignUpSubmitRegex = () => {
  //ref는 선택적 사용 가능
  const idInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  //
  const pwRef = useRef<HTMLInputElement>(null);
  const confirmPwRef = useRef<HTMLInputElement>(null);
  const phoneMidRef = useRef<HTMLInputElement>(null);
  const phoneEndRef = useRef<HTMLInputElement>(null);

  //submit button 활성화여부
  const [isOn, setIsOn] = useState(false);
  const [confirm, setConfirm] = useState(false);

  //selectOption State
  const [selected, setSelected] = useState<SelectOptionsInterface>({});

  const [helperText, setHelperText] = useState<HelperTextInterface>({});

  //Input Value 실시간 반영
  const { values, handleChange } = useForm({
    id: '',
    password: '',
    passwordReconfirm: '',
    userName: '',
    birYear: '',
    birDay: '',
    email: '',
    phoneMid: '',
    phoneEnd: '',
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
      } else {
        setConfirm(false);
      }
    } else {
      setConfirm(false);
    }
  };

  //selectOption State onChange
  const selectHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({
      ...selected,
      [e.target.id]: e.target.value,
    });
  };

  //총 생년월일
  const birTotal = `${values.birYear}${selected.birMonth}${values.birDay}`;

  //총 휴대전화
  const phoneTotal = `${selected.phoneFirst}${values.phoneMid}${values.phoneEnd}`;

  useEffect(() => {
    //생년월일 helperText
    const birYearValue = String(values.birYear);
    const birDayValue = String(values.birDay);
    //휴대전화
    const phoneMidValue = String(values.phoneMid);
    const phoneEndValue = String(values.phoneEnd);

    if (values.birYear && values.birDay) {
      if (!regex.birYear.test(birYearValue)) {
        setHelperText((helperText) => ({
          ...helperText,
          birTotal: '태어난 년도 4자리를 정확하게 입력하세요.',
        }));
      } else if (!regex.birDay.test(birDayValue)) {
        setHelperText((helperText) => ({
          ...helperText,
          birTotal: '태어난 일(날짜) 2자리를 정확하게 입력하세요.',
        }));
      } else if (selected.birMonth === '') {
        setHelperText((helperText) => ({
          ...helperText,
          birTotal: '태어난 월을 선택하세요.',
        }));
      } else if (!regex.birTotal.test(birTotal)) {
        setHelperText((helperText) => ({
          ...helperText,
          birTotal: '생년월일을 다시 확인해주세요.',
        }));
      } else if (regex.birTotal.test(birTotal)) {
        setHelperText((helperText) => ({
          ...helperText,
          birTotal: '',
        }));
      }
    }

    //성별 helperText (''로 해야 처음(selected.gender=undefined상테)말고 성별 선택시(selected.gender=value ''인 상태)에 적용됨)
    if (selected.gender === '') {
      setHelperText((helperText) => ({
        ...helperText,
        gender: '필수 정보입니다.',
      }));
    } else if (selected.gender !== '') {
      setHelperText((helperText) => ({
        ...helperText,
        gender: '',
      }));
    }

    //휴대전화 total
    if (selected.phoneFirst === undefined) {
      setHelperText((helperText) => ({
        ...helperText,
        phone: '',
      }));
    } else if (
      selected.phoneFirst === '' ||
      values.phoneMid === '' ||
      values.phoneEnd === ''
    ) {
      setHelperText((helperText) => ({
        ...helperText,
        phone: '필수 정보입니다.',
      }));
    } else if (!regex.phoneTotal.test(phoneTotal)) {
      setHelperText((helperText) => ({
        ...helperText,
        phone: '휴대전화 번호를 확인해주세요.',
      }));
    } else if (
      regex.phoneMid.test(phoneMidValue) &&
      regex.phoneEnd.test(phoneEndValue) &&
      regex.phoneTotal.test(phoneTotal)
    ) {
      setHelperText((helperText) => ({
        ...helperText,
        phone: '',
      }));
    }
  }, [selected, values]);

  //regex test를 통과 안된 경우 submit button이 비활성화되도록 설정함. (추후추가 수정하기)
  useEffect(() => {
    //기존 공통사용으로 여러개였던 type을 regex test하기 위해선 String으로 바꿔줘야해서 형변환시킴
    const idValue = String(values.id);
    const pwValue = String(values.password);
    const userNameValue = String(values.userName);
    /* const emailValue = String(values.email); */

    //&&는 차례대로 순서 작성해야 모든것이 적용되는것을 참고하기.
    if (
      regex.id.test(idValue) &&
      regex.password.test(pwValue) &&
      confirm &&
      regex.userName.test(userNameValue) &&
      regex.birTotal.test(birTotal) &&
      /* regex.email.test(emailValue) && */
      selected.gender !== '' &&
      regex.phoneTotal.test(phoneTotal)
    ) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [values, isOn, confirm, selected]); //디펜더시는 values로 설정해야 input값이 작성중 바뀔때 실시간으로 감지되어 위 코드가 적용된다.

  //조건일치해서 로그인버튼이 활성화됐을 경우 모든 정보를 totalValue에 저장
  if (isOn === true) {
    const totalValue = {
      id: values.id,
      password: values.password,
      userName: values.userName,
      birTotal: birTotal,
      gender: selected.gender,
      email: values.email,
      phoneTotal: phoneTotal,
    };

    console.log(totalValue);
  }

  return (
    <div className='formContainer'>
      <h3 className='formTitle'> </h3>
      <div className='formBox'>
        <form /* onSubmit={handleOnChange} */ className='signUpForm'>
          <InputSignUpSubmitRegex
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
            <InputSignUpSubmitRegex
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
            <InputSignUpSubmitRegex
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
            <InputSignUpSubmitRegex
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

          <div>
            <p>생년월일</p>
            <div className='birContainer'>
              <InputSignUpSubmitRegex
                type='text'
                name='birYear'
                value={values?.birYear}
                placeholder='년(자)'
                onChange={handleChangeTarget}
                labelClassName='label'
                className='input'
                maxValue={4}
                helperTextClassName='helperText'
              />
              <SelectOptionMonth onChange={selectHandleChange} />
              <InputSignUpSubmitRegex
                type='text'
                name='birDay'
                value={values?.birDay}
                placeholder='일'
                onChange={handleChangeTarget}
                labelClassName='label'
                className='input'
                maxValue={2}
                helperTextClassName='helperText'
              />
            </div>

            {helperText.birTotal && (
              <p className='helperText'>{helperText.birTotal}</p>
            )}
          </div>

          <div className='selectContainer'>
            <p>성별</p>
            <SelectOptionClassic
              onChange={selectHandleChange}
              selectId='gender'
              optionsLists={selectGenderLists}
            />
            {helperText.gender && (
              <p className='helperText'>{helperText.gender}</p>
            )}
          </div>

          <InputSignUpSubmitRegex
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
            successText={''}
            errorText={'이메일 주소를 다시 확인해주세요.'}
            helperTextClassName='helperText'
          />

          <div className='phoneContainer'>
            <p>휴대전화</p>
            <div className='phoneWrap'>
              <SelectOptionClassic
                onChange={selectHandleChange}
                selectId='phoneFirst'
                optionsLists={selectPhoneLists}
              />
              <p>-</p>
              <InputSignUpSubmitRegex
                title=''
                type='text'
                name='phoneMid'
                value={values?.phoneMid}
                placeholder=''
                ref={phoneMidRef}
                className='input'
                labelClassName='label'
                onChange={handleChangeTarget}
                maxValue={4}
                successText={''}
              />
              <p>-</p>
              <InputSignUpSubmitRegex
                title=''
                type='text'
                name='phoneEnd'
                value={values?.phoneEnd}
                placeholder=''
                ref={phoneEndRef}
                className='input'
                labelClassName='label'
                onChange={handleChangeTarget}
                maxValue={4}
                successText={''}
              />
            </div>
            {helperText.phone && (
              <p className='helperText'>{helperText.phone}</p>
            )}
          </div>

          {/* regex test 통과 안된 경우 submit button 비활성화되도록 설정*/}
          <div className={isOn === false ? 'submitBtn Err' : 'submitBtn'}>
            <SubmitBtn
              text='회원가입'
              className='blueSubmitBtn'
              disabled={!isOn}
            />
          </div>
        </form>
      </div>

      <HomeLinkBtn />
    </div>
  );
};

export default SignUpSubmitRegex;
