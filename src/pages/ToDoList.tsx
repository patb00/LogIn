import React, { useState, useRef, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CheckBoxComponent from "../components/CheckBoxComponent";
import Gumb from "../components/Gumb";
import InputField from "../components/InputField";
import RemoveButton from "../components/RemoveButton";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SignOutButton from "../components/SignOutButton";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

interface Task {
  id: string;
  title: string;
  checked: boolean;
}

function ToDoList() {
  const aktivnostRef = useRef<HTMLInputElement>(null);
  const [isNewPasswordEnabled, setIsNewPasswordEnabled] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState<string>("");
  const [entered, setOpen] = React.useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUsername(currentUser.username);
    const userTasksKey = `tasks_${currentUser.username}`;
    const savedTasks = JSON.parse(localStorage.getItem(userTasksKey) || "[]");
    setTasks(savedTasks);
  }, []);

  const handleCheckboxChange = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, checked: !task.checked };
        }
        return task;
      })
    );
  };

  const dodajAktivnost = () => {
    const aktivnost = aktivnostRef.current?.value;
    if (aktivnost) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: uuid(), title: aktivnost, checked: false },
      ]);
    }
  };

  const izbrisiAktivnost = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const natragFunkcija = () => {
    navigate("/login");
  };

  const changePassword = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const spremiAktivnosti = () => {
    const userTasksKey = `tasks_${username}`;
    localStorage.setItem(userTasksKey, JSON.stringify(tasks));
    console.log(tasks);
    console.log(username);
  };

  interface User {
    username: string;
    password: string;
  }

  const updatePassword = (oldPassword: string, newPassword: string) => {
    const currentUserJson = localStorage.getItem("currentUser");
    if (!currentUserJson) {
      alert("No user is currently logged in.");
      handleClose();
      return;
    }

    const currentUser = JSON.parse(currentUserJson);

    if (!currentUser.password) {
      alert("Current user data is corrupted or incomplete.");
      handleClose();
      return;
    }

    if (currentUser.password === oldPassword) {
      const usersJson = localStorage.getItem("users");
      setIsNewPasswordEnabled(true);
      if (usersJson) {
        const users: User[] = JSON.parse(usersJson);
        const userIndex = users.findIndex(
          (user: User) => user.username === currentUser.username
        );

        if (userIndex !== -1) {
          users[userIndex].password = newPassword;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
      alert("Password updated successfully.");
    } else {
      setIsNewPasswordEnabled(false);
      alert("The old password is incorrect.");
    }

    handleClose();
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        <SignOutButton
          variant="outlined"
          buttonText="Odjava"
          color="error"
          onClick={natragFunkcija}
        />
        <SignOutButton
          variant="outlined"
          buttonText="Promijeni lozinku"
          color="error"
          onClick={changePassword}
        />
        <ChangePasswordDialog
          open={entered}
          onClose={handleClose}
          onPasswordChange={updatePassword}
          isNewPasswordEnabled={isNewPasswordEnabled}
        />
      </Box>
      <InputField label="Unesi aktivnost" inputRef={aktivnostRef} />
      <Gumb
        variant="contained"
        buttonText="Dodaj aktivnost"
        onClick={dodajAktivnost}
      />
      <Box
        width={600}
        height={500}
        sx={{ border: "2px solid grey", overflow: "auto", mb: 2 }}
      >
        <Typography sx={{ m: 2 }} variant="h2" color={"#a9a9a9"}>
          To do List
        </Typography>
        {tasks.map((task) => (
          <Box key={task.id} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ marginRight: 2, marginLeft: 2 }}>
              <Typography
                variant="h6"
                style={{
                  textDecoration: task.checked ? "line-through" : "none",
                  color: task.checked ? "black" : "black",
                }}
              >
                {task.title}
              </Typography>
            </Box>
            <CheckBoxComponent
              onChange={() => handleCheckboxChange(task.id)}
              checked={task.checked}
            />
            <RemoveButton
              buttonText="REMOVE"
              variant="contained"
              onClick={() => izbrisiAktivnost(task.id)}
            />
          </Box>
        ))}
      </Box>
      <Gumb
        variant="contained"
        buttonText="Spremi"
        onClick={spremiAktivnosti}
      />
    </Container>
  );
}

export default ToDoList;
