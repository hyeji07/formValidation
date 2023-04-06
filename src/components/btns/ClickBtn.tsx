import { BtnInterface } from '@interfaces/components/ButtonInterface';

export default function ClickBtn({
  text,
  onClick,
  className,
}: BtnInterface.ClickBtnInterface) {
  return (
    <button type='button' onClick={onClick} className={className}>
      {text}
    </button>
  );
}
