import useArray from '@hooks/useArray';

export default function SelectOptionMonth() {
  const { arr } = useArray(12);

  const stringChange = (n: number) => String(n + 1);

  return (
    <span className='birMonth'>
      <select className='selectWrap'>
        <option value=''>월</option>
        {arr.map((item, idx) =>
          0 <= idx && idx < 9 ? (
            <option key={idx} value={0 + stringChange(idx)}>
              {idx + 1}
            </option>
          ) : (
            <option key={idx} value={stringChange(idx)}>
              {idx + 1}
            </option>
          )
        )}
      </select>
    </span>
  );
}
