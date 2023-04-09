import { BtnInterface } from '@interfaces/components/ButtonInterface';

export default function SubmitBtn({
  text,
  className,
  disabled,
}: BtnInterface.SubmitBtnInterface) {
  return (
    <button type='submit' className={className} disabled={disabled}>
      {text}
    </button>
  );
}
