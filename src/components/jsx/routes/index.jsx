import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Venue from "../pages/venue";
import About from "../pages/about";
import Contact from "../pages/contact";
import Register from "../pages/register";
import Login from "../pages/login";
import Profile from "../pages/profile";
import RouteNotFound from "../pages/routeNotFound";
import Success from "../pages/success";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Venue />} />
          <Route path="/venues/:page" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;