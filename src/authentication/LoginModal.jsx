import { useState, useContext } from "react";
import { GeneralContext } from "../App";
import { loginSchema } from './user/userValidation';

function Login() {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser, snackbar, setLoader, loginModal, setLoginModal, setSignModal, isDarkMode } = useContext(GeneralContext);

  const handleValid = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value }
    setFormData(obj)
    const validate = loginSchema.validate(obj, { abortEarly: false })
    const tempErrors = { ...errors }
    delete tempErrors[name];
    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key == name)
      if (item) {
        tempErrors[name] = item.message;
      }
    }
    setIsFormValid(!validate.error)
    setErrors(tempErrors)
  }

  const handleLogin = async (ev, setUser) => {
    ev.preventDefault();
    try {
      setLoader(true)
      const response = await fetch("http://localhost:4000/users/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.error) {
        setErrors(data.error);
        setIsFormValid(false)
      } else {
        localStorage.setItem("token", data.token);
        setUser(data.user); 
        setLoginModal(false);
        setFormData({
          email: "",
          password: "",
        });
        setErrors([]);
        snackbar(`Welcome ${data.user.firstName}!`)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      snackbar('Email or Password is Incorrect')
    }
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  };
  
  const cleanForm = () => {
    setLoginModal(false);
    setFormData({ email: "", password: "" });
    setErrors([]);
    setIsFormValid(false);
  }

  return (
    <>
      <button className="register-btn up" onClick={() => setLoginModal(true)}>Login</button>
      {loginModal && (
        <div className="modal-frame" onClick={cleanForm} >
          <div className={`login-modal modal ${isDarkMode ? 'dark' : ''}`} onClick={(ev) => ev.stopPropagation()}>
            <header>
              <button className="close-btn" onClick={cleanForm} >X</button>
              <h2>Login</h2>
            </header>
            <form onSubmit={(e) => handleLogin(e, setUser)}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  onChange={handleValid}
                  value={formData.email}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={handleValid}
                  value={formData.password}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </label>
              <button className="login-btn" disabled={!isFormValid}>Login</button>
              <p className="signup-link" onClick={() => { setLoginModal(false); setSignModal(true); }}>
                First time here? Sign up
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
