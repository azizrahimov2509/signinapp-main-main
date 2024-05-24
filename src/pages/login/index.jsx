import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Login() {
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

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail) usernameRef.current.value = rememberedEmail;
    if (rememberedPassword) passwordRef.current.value = rememberedPassword;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = usernameRef.current.value.trim();
    const passWord = passwordRef.current.value.trim();

    const data = JSON.parse(localStorage.getItem("users")) ?? [];

    const user = data.filter(({ email, password }) => {
      return email === userName && password === passWord;
    });

    if (!userName) {
      setUsernameError("Login kiritilmagan!");
      return;
    } else {
      setUsernameError("");
    }

    if (!passWord) {
      setPasswordError("Parol kiritilmagan!");
      return;
    } else {
      setPasswordError("");
    }

    if (user.length) {
      localStorage.setItem("user", JSON.stringify(true));
      navigate("/layout/home");
    } else {
      localStorage.setItem("user", JSON.stringify(false));
      setErrorMessage(
        "Login yoki Parol noto'g'ri, iltimos, registratsiya qilib ko'ring!"
      );
    }

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="container container-login">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              <h3 className="info">Nice to see you!</h3>
              <h4 className="info-title">
                Enter your email and password to sign in
              </h4>
              <label className="login__field">
                Email
                <FaUser className="login__icon" />
                <input
                  ref={usernameRef}
                  type="email"
                  className="login__input"
                  placeholder="Your email address"
                />
                {usernameError && (
                  <p className="error-message">{usernameError}</p>
                )}
              </label>
              <label className="login__field">
                Password
                <IoLockClosed className="login__icon" />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="login__input"
                  placeholder=" Your password"
                />
                {showPassword ? (
                  <FaEye
                    className="login_eyeicon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <FaEyeSlash
                    className="login_eyeicon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </label>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AntSwitch
                    defaultChecked
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography color={"white"}>Remember me</Typography>
                </Stack>
              </FormGroup>

              <button type="submit" className="button login__submit">
                SIGN IN
              </button>
            </form>
            <p className="signUp-text">
              Don't have an account?
              <Link to={"/"} className="signUP">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
