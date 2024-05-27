import { useContext, useState } from "react"
import './modal-styles/modal.css'
import './modal-styles/login-signup.css'
import { signupSchema } from "./user/userValidation";
import { GeneralContext } from "../App";

function Signup() {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: ""
  });
  
  const { snackbar, setLoader, signupModal, setSignModal, setLoginModal, isDarkMode } = useContext(GeneralContext);

  const handleValid = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value }
    setFormData(obj)
    const validate = signupSchema.validate(obj, { abortEarly: false })
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

  const handleSignup = async (ev) => {
    ev.preventDefault();
    try {
      setLoader(true)
      const response = await fetch('http://localhost:4000/users/signup', {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        if (data.error.includes('Email already exists')) {
          snackbar('Email already exists');
        } else {
          setErrors(data.error);
        }
      } else {
        setSignModal(false);
        setFormData({
          firstName: "", lastName: "", phone: "", email: "",
          password: "", city: "", street: "", houseNumber: ""
        });
        setErrors([]);
        setTimeout(() => {
          setLoader(false)
        }, 500)
        snackbar(`Hello and Welcome ${data?.firstName}!`)
        setLoginModal(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoader(false)
    }
  };

  const inputFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "phone", label: "Phone", type: "phone" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "city", label: "City", type: "text" },
    { name: "street", label: "Street", type: "text" },
    { name: "houseNumber", label: "House Number", type: "text" },
  ];

  const cleanForm = () => {
    setSignModal(false);
    setFormData({
      firstName: "", lastName: "", phone: "", email: "", password: "",
      city: "", street: "", houseNumber: ""
    });
    setErrors([]);
    setIsFormValid(false);
  }

  return (
    <>
      <button className="register-btn up" onClick={() => setSignModal(true)}>Signup</button>
      {signupModal && (
        <div className="modal-frame" onClick={cleanForm}>
          <div className={`signup-modal modal ${isDarkMode ? 'dark' : ''}`} onClick={(ev) => ev.stopPropagation()}>
            <header>
              <button className="close-btn" onClick={cleanForm}>X</button>
              <h2>Signup</h2>
            </header>
            <form onSubmit={handleSignup}>
              {inputFields.map((field, index) => (
                <label key={index}>
                  {field.label}:
                  <input
                    type={field.type}
                    name={field.name}
                    autoComplete="off"
                    onChange={handleValid}
                    value={formData[field.name]}
                  />
                  {errors[field.name] && (
                    <div className="error-message">{errors[field.name]}</div>
                  )}
                </label>
              ))}
              <button className="signup-btn" disabled={!isFormValid}>Sign</button>
              <p className="login-link" onClick={() => { setLoginModal(true); setSignModal(false); }}>
                Already signed up? Log in
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Signup;
