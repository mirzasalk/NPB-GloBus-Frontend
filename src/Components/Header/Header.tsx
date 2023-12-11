import "./header.css";

const Header = () => {
  return (
    <div id="headerMain">
      <img className="logoImg" src="./globusLogo.png" alt="logo" />
      <div className="logIn-LogOutDiv">
        <a href="#">Log in</a>
        <p>/</p>
        <a href="#">Register</a>
      </div>
    </div>
  );
};

export default Header;
