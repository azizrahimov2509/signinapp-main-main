import React, { useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    avatar: "",
    phone: "+9989",
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    avatar: false,
    phone: false,
    login: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    Object.keys(userInput).forEach((key) => {
      if (!userInput[key]) {
        setErrors((prev) => ({ ...prev, [key]: true }));
        hasError = true;
      } else {
        setErrors((prev) => ({ ...prev, [key]: false }));
      }
    });

    if (hasError) {
      return;
    }

    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInput }),
      });
      const res = await req.json();
      localStorage.setItem("users", JSON.stringify([res]));
    } catch {
      alert("Error");
    }

    const data = JSON.parse(localStorage.getItem("usersData")) ?? [];
    localStorage.setItem("usersData", JSON.stringify([...data, userInput]));
    localStorage.setItem("currentUser", JSON.stringify(userInput)); // bu hozirgi user
    setUserInput({
      name: "",
      email: "",
      avatar: "",
      phone: "+9989",
      login: "",
      password: "",
    });

    localStorage.setItem("user", JSON.stringify(true));
    navigate("/layout/home");
  };

  return (
    <section>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              value={userInput.name}
              className={`${style.input} ${errors.name && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="name"
              placeholder="First Name"
            />
            {errors.name && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="email">
            <input
              value={userInput.email}
              className={`${style.input} ${errors.email && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, email: e.target.value }))
              }
              type="text"
              id="email"
              placeholder="email"
            />
            {errors.email && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="avatar">
            <input
              value={userInput.avatar}
              className={`${style.input} ${errors.avatar && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, avatar: e.target.value }))
              }
              type="text"
              id="avatar"
              placeholder="avatar"
            />
            {errors.avatar && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="phone">
            <input
              value={userInput.phone}
              className={`${style.input} ${errors.phone && style.error}`}
              onChange={(e) => {
                const { value } = e.target;
                const phonePattern = /^[0-9-+\s()]*$/;
                if (phonePattern.test(value)) {
                  setUserInput((prev) => ({ ...prev, phone: value }));
                }
              }}
              type="tel"
              id="phone"
              placeholder="Phone Number"
              pattern="[0-9-+\s()]*"
            />
            {errors.phone && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="login">
            <input
              value={userInput.login}
              className={`${style.input} ${errors.login && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, login: e.target.value }))
              }
              type="text"
              id="login"
              placeholder="Username"
            />
            {errors.login && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="password">
            <input
              value={userInput.password}
              className={`${style.input} ${errors.password && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, password: e.target.value }))
              }
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
            />
            {showPassword ? (
              <FaEye
                className={style.login_eyeicon}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <FaEyeSlash
                className={style.login_eyeicon}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
            {errors.password && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <button type="submit" className={style.button}>
            Submit
          </button>
          <Link to={"/"} className={style.login}>
            Login
          </Link>
        </form>
      </div>
    </section>
  );
}
