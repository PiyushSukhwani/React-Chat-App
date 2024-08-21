import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../lib/firebase";
import { useDispatch } from "react-redux";
// import { login as authLogin, fetchUserInfo } from "../../store/useUserStore";
import AuthHook from "../../AuthHook";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login } = AuthHook();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const user = await login(email, password);
      if (user) {
        toast.success("Logged in");
        navigate("/");
      }
      // const authenticatedUser = await userCredential.user;  // returns the user data on login
      // await dispatch(fetchUserInfo(authenticatedUser.uid));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerr">
      <div className="login">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button disabled={loading}>{loading ? "Loading" : "Sign in"}</button>
        </form>
      <p className="register-link">Don't have an account? <Link to="/register">Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;
