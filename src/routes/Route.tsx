import { Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import SignUp from '@pages/login/SignUp';
import '@styles/global.scss';
import Login from '@pages/login/classic/Login';
import LoginOnchangeRegex from '@pages/login/onchangeRegex/LoginOnchangeRegex';
import SignUpOnchangeRegex from '@pages/login/onchangeRegex/SignUpOnchangeRegex ';

export default function AppRoute(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign_up' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login_regex' element={<LoginOnchangeRegex />} />
      <Route path='/sign_up_regex' element={<SignUpOnchangeRegex />} />
    </Routes>
  );
}
