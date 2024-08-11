import "./App.css";

import Main from "./layouts/Main";
import UserList from "./components/user/UserList";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import Dashboard from "./components/Dashboard";
import Layout from "./layouts/Layout";
function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/" element={<Dashboard />} />
            <Route path='/users' element={<UserList />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes></PublicRoutes>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
