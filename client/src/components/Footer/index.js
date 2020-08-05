import React from "react";
import { Link } from 'react-router-dom';


function Footer() {
    
  return (
    <footer className="container-fluid mt-3 fixed-bottom">
      <section className="navbar d-flex justify-content-center rounded shadow-lg ">
          <section className="bottom-bar gradient-text">
            <a href="/" ><i className="fa fa-home bottomfa"></i></a>
            <a href="https://www.instagram.com/in2thetrail/" target="_blank"><i className="fa fa-instagram bottomfa"></i></a>
          </section>
      </section>
  </footer>
  );
}

export default Footer;
