import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/App";
import SignUp from "./Pages/Auth/Signup/App";
import Layout from "./Layout";
import Favorites from "./Pages/Favorites/index";
import Categories from "./Pages/Categories";

import Home from "./Pages/HomePage/App";

const App = () => {
  return (
    <Routes>

      {/* ❌ No Header/Footer */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ✅ With Header + Footer */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/categories" element={<Categories />} />
 

      </Route>

    </Routes>
  );
};

export default App;