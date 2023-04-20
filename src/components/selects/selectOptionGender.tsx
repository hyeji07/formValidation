export default function SelectOptionGender() {
  return (
    <span className='genderContainer'>
      <select className='selectWrap'>
        <option value=''>성별</option>
        <option value='male'>남자</option>
        <option value='female'>여자</option>
        <option value='none'>선택안함</option>
      </select>
    </span>
  );
}
