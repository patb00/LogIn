import React, { useRef, useState } from "react";
import InputField from "../components/InputField";
import Gumb from "../components/Gumb";
import SocialMedia from "../components/SocialMedia";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("Username:", username);
    console.log("Password:", password);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (user) {
      navigate("/todolist");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSignUp = () => {
    navigate("/signin");
  };

  return (
    <Container>
      <Typography variant="h2" color={"#141414"}>
        Login to your account
      </Typography>
      <SocialMedia />
      <InputField label="Username" inputRef={usernameRef} />
      <InputField label="Password" inputRef={passwordRef} />
      <Gumb buttonText="Log In" variant="contained" onClick={handleLogin} />
      <Gumb buttonText="Sign Up" variant="outlined" onClick={handleSignUp} />
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default LoginPage;
