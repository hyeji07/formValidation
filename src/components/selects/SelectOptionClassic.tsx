import { SelectOptionInterface } from '@interfaces/components/SelectOptionInterface';

export default function SelectOptionClassic({
  onChange,
  selectId,
  optionsLists,
}: SelectOptionInterface) {
  return (
    <span className='genderContainer'>
      <select className='selectWrap' id={selectId} onChange={onChange}>
        {/*   <option value=''>성별</option>
        <option value='male'>남자</option>
        <option value='female'>여자</option>
        <option value='none'>선택안함</option> */}

        {optionsLists.map((item, i) => (
          <option value={item.value} key={item.value}>
            {item.content}
          </option>
        ))}
      </select>
    </span>
  );
}
