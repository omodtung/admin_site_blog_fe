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
import UserAdd from "./components/user/UserAdd";
import "./css/styles.css";
import UserUpdate from "./components/user/UserUpdate";
import PageNotFound from "./components/PageNotFound";
import PostList from "./components/post/PostList";
import Profile from "./components/Profile";
import PostAdd from "./components/post/PostAdd";
import PostUpdate from "./components/post/PostUpdate";
function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserAdd />} />
            <Route path="/users/edit/:id" element={<UserUpdate />} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/posts" element={<PostList></PostList>} />
            <Route path="/post/add" element={<PostAdd></PostAdd>}/>
            <Route path="/post/edit/:id" element={<PostUpdate></PostUpdate>}/>
          </Route>
        </Route>
        <Route element={<PublicRoutes></PublicRoutes>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
