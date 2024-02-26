import React, { useRef } from "react";
import InputField from "../components/InputField";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Gumb from "../components/Gumb";

const Signin = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const informacijeOsobe = () => {
    const name = nameRef.current?.value || "";
    const surname = surnameRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const newUser = { name, surname, username, password };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const signInSuccessful = true; // For demonstration purposes

    if (signInSuccessful) {
      window.location.href = "/login"; // Navigate to '/login'
    }
  };

  return (
    <Container>
      <Typography variant="h2" color={"#141414"}>
        Sign in to your account
      </Typography>
      <InputField label="Name" inputRef={nameRef} />
      <InputField label="Surname" inputRef={surnameRef} />
      <InputField label="Username" inputRef={usernameRef} />
      <InputField label="Password" inputRef={passwordRef} />
      <Gumb
        buttonText="Sign Up"
        variant="contained"
        onClick={informacijeOsobe}
      />
    </Container>
  );
};

export default Signin;
