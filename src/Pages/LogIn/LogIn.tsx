import "./login.css";

import React, { useState, FormEvent } from "react";
import axiosInstance from "../../api/axios-config";

interface FormData {
  Email: string;
  Password: string;
}

interface FormErrors {
  Email: string;
  Password: string;
}

const LogIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    Email: "",
    Password: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = (): boolean => {
    let isValid = true;

    const newErrors: FormErrors = {
      Email: "",
      Password: "",
    };

    // Validacija za prazna polja
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof FormData;
      if (!formData[typedKey]) {
        newErrors[typedKey] = "This field is required.";
        isValid = false;
      }
    });

    // Validacija za email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.Email && !emailRegex.test(formData.Email)) {
      newErrors.Email = "Invalid email address.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      console.log(formData);
      try {
        const response = await axiosInstance.post("Users/add", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        return response.data;
      } catch (error) {
        console.log("Registration failed", error);
      }
    } else {
      console.log("Form is invalid. Please check the errors.");
    }
  };

  return (
    <div id="LogInMain">
      <div className="center-LogIn-div">
        <img className="userIcon" src="regIcon2.png" alt="Register now" />

        <div className="logInInputDiv">
          <div className="logInInputHelperDiv">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.Email}
              onChange={(e) => handleInputChange("Email", e.target.value)}
            />
          </div>
          <span className="error">{errors.Email}</span>
        </div>

        <div className="logInInputDiv">
          <div className="logInInputHelperDiv">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.Password}
              onChange={(e) => handleInputChange("Password", e.target.value)}
            />
          </div>
          <span className="error">{errors.Password}</span>
        </div>

        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default LogIn;
