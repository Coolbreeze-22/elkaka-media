import "./App.css";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import AllUsers from "./components/AllUsers/AllUsers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PostDetails } from "./components/PostDetails/PostDetails";

function App() {

  const GOOGLE_ID = process.env.GOOGLE_ID;
  
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={(!user ? <Auth /> : <Navigate replace to="/posts" />)} />
            <Route path="/allUsers" element={<AllUsers />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
