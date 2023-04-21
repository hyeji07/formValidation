import useArray from '@hooks/useArray';
import { SelectOptionInterface } from '@interfaces/components/SelectOptionInterface';

export default function SelectOptionMonth({ onChange }: SelectOptionInterface) {
  const { arr } = useArray(12);

  const stringChange = (n: number) => String(n + 1);

  return (
    <span className='birMonth'>
      <select className='selectWrap' id='birMonth' onChange={onChange}>
        <option value=''>월</option>
        {arr.map((item, idx) => (
          <option
            key={idx}
            value={
              0 >= item || item < 9
                ? 0 + stringChange(item)
                : stringChange(item)
            }
          >
            {item + 1}
          </option>
        ))}
      </select>
    </span>
  );
}
