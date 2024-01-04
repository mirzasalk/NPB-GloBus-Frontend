import "./header.css";

const Header = () => {
  return (
    <div id="headerMain">
      <img className="logoImg" src="./globusLogo.png" alt="logo" />
      <div className="logIn-LogOutDiv">
        <a href="/logIn">Log in</a>
        <p>/</p>
        <a href="/">Register</a>
      </div>
    </div>
  );
};

export default Header;
