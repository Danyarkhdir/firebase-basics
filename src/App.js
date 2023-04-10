import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UserList from "./components/UserList";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <UserList />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
