import { log } from '../log.js';
import { memo } from 'react';
// import logoImg from '../assets/logo.png';

const  Header = memo(function Header() {
  log('<Header /> rendered', 1);

  return (
    <header id="main-header">
      <h1>React - Behind The Scenes</h1>
    </header>
  );
})
export default Header;
