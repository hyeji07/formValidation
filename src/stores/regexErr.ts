import { atom } from 'recoil';

export const regexError = atom({
  key: 'regexError',
  default: '',
});

export const regexHelperText = atom({
  key: 'regexHelperText',
  default: '',
});
