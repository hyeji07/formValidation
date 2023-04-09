/* 기본 문자
/ /사이에 작성
[] 유니코드문자의 범위,구간
| OR 왼쪽 문자(혹은 패턴) 혹은 오른쪽 문자(혹은 패턴)과 일치
^ 시작
$ 끝
- 범위(시작~끝 사이의 문자구간)
*/

//한국어+글자수(3글자 이상,10글자 이하)
const nickname = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,10}$/;
//ㄱ-ㅎ 자음, ㅏ-ㅣ 모음, 자음+모음 다 통합 /3글자이상~10글자이하가 조건에 연속일치

//email형식
const email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//a-z 영어소문자, 0-9숫자,
// _ 언더스코어 나올 수 있다.
// . 이 나올 수 있다. (그냥 이스케이프하지 않고 사용하면 다른 문자를 의미하기 때문에 .은 \. 으로 사용하여 이스케이프해준다.([]안에서는 다른 문자의미X) )
// 위 참고: \는 다음에 오는 문자를 이스케이프 처리해줌
// - 하이픈이 나올 수 있다.
// @ 앳기호 나옴
// \d 숫자, a-z 영어소문자, \.점, -하이픈 이 사용됨(도메인)
// \. 점
// a-z영어 \.점
// {2,6} 2~6개 문자열 (2~6개로 한 이유는 .co.kr이나 .ny.us같은 국가 TLD(Top-Level-Domain)때문)
//위 ()안에 작성된것들은 안에서 1개또는 그이상의 문자를 나오게함

//// password
//영어소문자+숫자+특수문자(_,-)+글자수(6글자 이상, 10글자 이하)
//const password = /^[a-z0-9_-]{6,10}$/;

//최소 8자 이상으로 숫자, 특수문자가 각각 최소 1개이상
//const password = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//최소 8자 이상~16자로 영문자 대문자, 영문자 소문자, 숫자, 특수문자가 각각 최소 1개 이상
const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
//(?=.*?[A-Z]) A부터 Z까지 있는지 보는 정규식
// ?= 전방탐색
// . any 문자or숫자or공백
// {8,} 최소 8자 이상 일때는 이렇게 사용

const regex = { nickname, email, password };

export default regex;