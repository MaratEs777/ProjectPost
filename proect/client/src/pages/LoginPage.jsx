import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
  }, [status, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      toast("Вы вошли в систему.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-white-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="userName"
          className="mt-1 text-black w-full rounded-lg bg-white-400 border py-1 px-2 text-xs outline-none placeholder: text-white-700"
        />
      </label>

      <label className="text-xs text-white-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-white-400 border py-1 px-2 text-xs outline-none placeholder: text-white-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Войти
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
