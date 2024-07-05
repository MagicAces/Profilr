// import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

import PrivateRoute from "./components/PrivateRoute.tsx";

// import Login from "./pages/Login.tsx";
// import Home from "./pages/Home.tsx";
// import Success from "./pages/Success.tsx";
// import Failure from "./pages/Failure.tsx";
import Create from "./pages/Create.tsx";
import Edit from "./pages/Edit.tsx";
import Error from "./components/Error.tsx";
import NotFound from "./components/NotFound.tsx";
// import AdminRoute from "./components/AdminRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Student from "./pages/Student.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failure" element={<Failure />} /> */}

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/student/:id/edit" element={<Edit />} />
        <Route path="/student/:id" element={<Student />} />

        {/* <Route path="" element={<AdminRoute />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
