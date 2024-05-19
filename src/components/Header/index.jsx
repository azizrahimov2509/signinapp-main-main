import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    avatar: "",
    name: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({
        avatar: currentUser.avatar,
        name: currentUser.name,
      });
    }
  }, []);

  function LogOut() {
    localStorage.setItem("user", JSON.stringify(false));
    localStorage.removeItem("currentUser"); // Очистить текущего пользователя
    navigate("/");
  }

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.headerContainer}>
          <Link className={style.logo} to={"/layout"}>
            A<span>PI</span>
          </Link>
          <nav>
            <ul className={style.list}>
              <li>
                <NavLink className={style.listLink} to={"home"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={style.listLink} to={"infos"}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className={style.listLink} to={"infos"}>
                  Contacts
                </NavLink>
              </li>
            </ul>
          </nav>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={LogOut} className="logout">
              Log out
            </button>
            <Link to={"/signup"} className="signUp">
              SignUp
            </Link>
          </div>
          <div className={style.userContainer}>
            {user.avatar ? (
              <img
                src={user.avatar}
                className={style.photo}
                alt="User Avatar"
              />
            ) : (
              <img
                src="../../../public/vite.svg"
                className={style.photo}
                alt="Default Avatar"
              />
            )}
            {user.name && <span className={style.userName}>{user.name}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}
