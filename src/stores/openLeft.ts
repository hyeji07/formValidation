import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const openLeft = atom({
  key: 'openLeft',
  default: true,
});


export const openDepthLeft = atom({
  key: 'openDepthLeft',
  default: false,
});

export const selectedMenuState = atom({
  key: 'selectedMenuState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

