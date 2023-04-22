import { Link } from 'react-router-dom';

import './homeLinkBtn.scss';

export default function HomeLinkBtn() {
  return (
    <button className='homeLinkBtn'>
      <Link to='/'>🏡 Home으로 되돌아가기</Link>
    </button>
  );
}
