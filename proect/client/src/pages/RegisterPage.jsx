import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Регистрация</h1>
      <label className="text-xs text-white-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value); //// записываем value из инпута в username который в useState
          }}
          placeholder="userName"
          className="mt-1 text-black w-full rounded-lg bg-white-400 border py-1 px-2 text-xs outline-none placeholder: text-white-700"
        />
      </label>

      <label className="text-xs text-white-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
          Зарегистрироваться
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white"
        >
          Есть аккаунт?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
