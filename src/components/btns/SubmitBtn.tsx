import { BtnInterface } from '@interfaces/components/ButtonInterface';

export default function SubmitBtn({
  text,
  className,
}: BtnInterface.SubmitBtnInterface) {
  return (
    <button type='submit' className={className}>
      {text}
    </button>
  );
}
