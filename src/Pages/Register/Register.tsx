import "./register.css";

const Register = () => {
  return (
    <div id="RegisterMain">
      <div className="center-div">
        <img className="userIcon" src="regIcon2.png" alt="Register now" />
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Register</button>
      </div>
    </div>
  );
};

export default Register;
