import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import List from "./components/list/List.jsx";
import Home from "./Home.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/register",
//         element: (
//           <AuthLayout authentication={false}>
//             <Register />
//           </AuthLayout>
//         ),
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // // <React.StrictMode>
  //   <Provider store={store}>
  //     <RouterProvider router={router} />
  //   </Provider>
  // </React.StrictMode>
  <App />
);
