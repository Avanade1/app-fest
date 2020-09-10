import React from 'react'

//import { Card } from 'react-bootstrap';
//import './footer.css';

function Footer() {
  return (
    <div className="footer">
		<address>
  <div class="address">
	<h1 class="address-name">Ana Ramos</h1>
	<a href="https://github.com/ana-ramos09"><i class="fab fa-github"></i></a>
	<a href="mailto:ana.carolina.dos.reis.ramos@gmail.com"><i class="fas fa-envelope"></i></a>
  </div>
  <div class="address-contact">
	<p class="address-p">Contact</p>
	<span class="address-bar">|</span>
  </div>
  <div class="address">
	<h1 class="address-name">Natasha Costa</h1>
	<a href="https://github.com/narodrigues"><i class="fab fa-github"></i></a>
	<a href="mailto:natasha.gr.costa@gmail.com"><i class="fas fa-envelope"></i></a>
  </div>
</address>
<div id="footer-container-copyright">
  <p id="cp-text">© Copyright 2020 Pokédex Go. All rights reserved.</p>
</div>

    </div>
  );
};

export default Footer;




