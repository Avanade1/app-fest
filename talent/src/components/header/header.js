import React from 'react';
import logo from '../../img/logo.svg'; 
import './header.css';


function Header() {
	return (
    <header>
	<img alt='Logo Laboratoria' src={logo}></img>
    </header>
);
}

export default Header;
