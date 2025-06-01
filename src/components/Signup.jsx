import React, { useState } from 'react';
import '../css/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [,setIsLoggedIn]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "username":
          if (/^[a-zA-Z0-9._@#!-]{4,}$/.test(value)) {
            delete newErrors.username;
          }
          break;
        case "email":
          if (/^[a-zA-Z]+[a-zA-Z0-9._-]*@gmail\.com$/.test(value)) {
            delete newErrors.email;
          }
          break;
        case "password":
          if (
            value.length >= 8 &&
            value.length <= 12 &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,12}$/.test(value)
          ) {
            delete newErrors.password;
          }
          if (formData.confirmPassword === value) {
            delete newErrors.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (formData.password === value) {
            delete newErrors.confirmPassword;
          }
          break;
        default:
          break;
      }

      return newErrors;
    });
  };

  const validate = () => {
    const newErrors = {};
    const userRegex = /^[a-zA-Z0-9._@#!-]{4,}$/;
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._-]*@gmail\.com$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,12}$/;

    if (!userRegex.test(formData.username)) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.length < 8 || formData.password.length > 12) {
      newErrors.password = "Password must be between 8 and 12 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Registration successful");
      setIsLoggedIn(true); 
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

//   const handleSignOut = () => {
//   setFormData({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//   });
//   setErrors({});
//   setIsLoggedIn(false); // ✅ Reset login status
//   alert("Signed out successfully");
// };

  return (
    <div className="root-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signup-username">Username:</label>
            <input
              type="text"
              id="signup-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className="error" id="username-error">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email:</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="error" id="email-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password:</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error" id="password-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="signup-confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error" id="confirm-password-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-gender">Gender:</label>
            <select
              id="signup-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
