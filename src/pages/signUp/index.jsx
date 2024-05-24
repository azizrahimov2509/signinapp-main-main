import React, { useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function SignUp() {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 16,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(10px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(14px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    avatar: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

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

      const existingUsers = JSON.parse(localStorage.getItem("users")) ?? [];

      const updatedUsers = [...existingUsers, res];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch {
      alert("Error");
    }

    localStorage.setItem("currentUser", JSON.stringify(userInput)); // current user
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", userInput.email);
      localStorage.setItem("rememberedPassword", userInput.password);
    }
    setUserInput({
      name: "",
      email: "",
      avatar: "",
      password: "",
    });

    localStorage.setItem("user", JSON.stringify(true));
    navigate("/layout/home");
  };

  return (
    <section>
      <div className={style.container}>
        <div className={style.title}>
          <h2 className={style.welcome}>Welcome!</h2>
          <p className={style.account}>
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              value={userInput.name}
              className={`${style.input} ${errors.name && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="name"
              placeholder="Your full name"
            />
            {errors.name && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="email">
            Email
            <input
              value={userInput.email}
              className={`${style.input} ${errors.email && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, email: e.target.value }))
              }
              type="text"
              id="email"
              placeholder="Your email address"
            />
            {errors.email && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="avatar">
            Avatar
            <input
              value={userInput.avatar}
              className={`${style.input} ${errors.avatar && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, avatar: e.target.value }))
              }
              type="text"
              id="avatar"
              placeholder="Your Avatar link"
            />
            {errors.avatar && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="password">
            Password
            <input
              value={userInput.password}
              className={`${style.input} ${errors.password && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, password: e.target.value }))
              }
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your password"
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
          <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography color={"white"}>Remember me</Typography>
            </Stack>
          </FormGroup>
          <button type="submit" className={style.button}>
            SIGN UP
          </button>
          <p className={style.text}>
            Already have an account?
            <Link to={"/login"} className={style.login}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
