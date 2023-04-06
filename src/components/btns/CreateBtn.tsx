import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

import { BtnInterface } from '@interfaces/components/ButtonInterface';

export default function CreateBtn({
  text,
  onClick,
  className,
}: BtnInterface.ClickBtnInterface) {
  return (
    <Button
      variant='contained'
      endIcon={<CreateIcon />}
      onClick={onClick}
      color='info'
      sx={{ backgroundColor: '#0b4988' }}
      className={className}
    >
      {text}
    </Button>
  );
}
