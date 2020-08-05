import React from "react";


function Header(props) {

  console.log(props)
  return (
    <header className="container flex flex-vertical" id="go_to_top">
      <div className="header-div mx-auto text-center align-items-end">
        <span>
          <img src="./images/logo2.svg" className="header-pic " style={{height: "3em"}} alt="banner"/>
          <img src="./images/pic2.svg" className="header-pic" alt="banner"/>
        </span>        
      </div>
    </header>
  );
}

export default Header;
