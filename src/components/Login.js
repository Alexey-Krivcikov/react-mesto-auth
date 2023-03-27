import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <h2 className="login__header">Вход</h2>
      <form className="login-form" name="login">
        <input
          className="login-form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="login-form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="6"
          required
        ></input>
        <button className="login-form__submit-btn" type="submit">
          Войти
        </button>
      </form>
      {/* <Link className="login__sing-in">Уже зарегистрированы? Войти</Link> */}
    </div>
  );
}

export default Login;
