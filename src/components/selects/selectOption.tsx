import useArray from '@hooks/useArray';

export default function SelectOption() {
  const { arr } = useArray(12);

  const stringChange = (n: number) => String(n + 1);

  return (
    <span>
      <select id='mm'>
        <option value=''>월</option>
        {arr.map((item, idx) =>
          0 <= idx && idx < 9 ? (
            <option value={0 + stringChange(idx)}>{idx + 1}</option>
          ) : (
            <option value={stringChange(idx)}>{idx + 1}</option>
          )
        )}
      </select>
    </span>
  );
}
