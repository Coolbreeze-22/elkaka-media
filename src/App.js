import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostContext } from "./context/context";
import { useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import AllUsers from "./components/AllUsers/AllUsers.js";
import User from "./components/AllUsers/User/User.js";
import { PostDetails } from "./components/PostDetails/PostDetails";
import Profile from "./components/Profile/Profile.jsx";

function App() {
  const GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID;
  const { user } = useContext(PostContext);
  const localUser = user?.result

  const admin1 = localUser?.isAdmin && localUser?.level >0;
  const admin2 = localUser?.isAdmin && localUser?.level >1;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ marginBottom: "20px" }}>
          <Navbar />
          <Routes>
            <Route path="*" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/profile"
              element={localUser?.email ? <Profile /> : <Navigate replace to="/posts" /> }
            />
            <Route
              path="/auth"
              element={!localUser ? <Auth /> : <Navigate replace to="/posts" />}
            />
            <Route
              path="/users"
              element={admin1 ? <AllUsers /> : <Navigate replace to="/posts" />}
            />
            <Route
              path="/users/user/:id"
              element={admin2 ? <User /> : <Navigate replace to="/posts" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
