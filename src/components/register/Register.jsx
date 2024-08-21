import React, { useState } from "react";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import upload from "../../lib/upload";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import AuthHook from "../../AuthHook";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = AuthHook();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      setLoading(true);
      const {user} = await signup(email, password, username)
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      // await dispatch(fetchUserInfo(res.user.uid));
      // console.log(res.user);
      console.log(user, user.uid);
      
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: user.uid,
        blocked: [],
      });
      
      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
      });
      
      navigate("/");
      toast.success("Account created! You can login now!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
            required
          />
          <input type="text" placeholder="Username" name="username" required />
          <input type="text" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button disabled={loading}>{loading ? "Loading" : "Sign up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
