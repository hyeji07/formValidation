import { Link } from 'react-router-dom';
import './home.scss';

function Home() {
  return (
    <div className='homeContainer'>
      <h3 className='homeBigText'>Form Regex 유효성 검사 예제 </h3>

      <div>
        <button className='homeBtn'>
          <Link to='/sign_up_regex'>회원가입 regex &#40;change&#41; 예제</Link>
        </button>
        <button className='homeBtn'>
          <Link to='/login_regex'>Login regex &#40;change&#41; 예제</Link>
        </button>
        <button className='homeBtn'>
          <Link to='/sign_up_submit_regex'>
            회원가입 regex 예제 &#40;submit클릭시&#41;
          </Link>
        </button>

        <button className='homeBtn'>
          <Link to='/login'>Login 기본 예제</Link>
        </button>
        <button className='homeBtn'>
          <Link to='/sign_up'>회원가입 기본 예제</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
