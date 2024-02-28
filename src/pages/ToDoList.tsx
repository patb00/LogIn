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
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

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
      <Box display="flex" flexDirection="row" justifyContent={"flex-end"}>
        <SignOutButton
          variant="outlined"
          buttonText="Promijeni lozinku"
          icon={<ManageAccountsIcon />}
          onClick={changePassword}
        />
        <SignOutButton
          variant="outlined"
          buttonText="Odjava"
          icon={<ExitToAppIcon />}
          onClick={natragFunkcija}
        />
        <ChangePasswordDialog
          open={entered}
          onClose={handleClose}
          onPasswordChange={updatePassword}
          isNewPasswordEnabled={isNewPasswordEnabled}
          username={username}
        />
      </Box>
      <Box display="flex" flexDirection="row">
        <InputField label="Unesi aktivnost" inputRef={aktivnostRef} />
        <Gumb
          variant="contained"
          onClick={dodajAktivnost}
          icon={<AddIcon />}
          sx={{
            mt: 2,
            ml: 2,
            width: 10,
            height: 55,
            fontWeight: "bold",
            fontSize: "25px",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box
        width={600}
        height={500}
        sx={{ border: "2px solid #242b46", overflow: "auto", mb: 2 }}
      >
        <Typography
          sx={{ mb: 3, mt: 3 }}
          variant="h3"
          color={"#666973"}
          fontFamily={"sans-serif"}
        >
          To do list
        </Typography>
        {tasks.map((task, index) => (
          <Box
            key={task.id}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: index % 2 === 0 ? "#e0e0e0" : "A5A5A5", // Alternating colors
            }}
          >
            <Box sx={{ marginRight: 2, marginLeft: 2 }}>
              <Typography
                variant="h6"
                style={{
                  fontFamily: "",
                  textDecoration: task.checked ? "line-through" : "none",
                  color: task.checked ? "#9e9e9e" : "black",
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
              buttonText=""
              icon={<RemoveIcon />}
              variant="contained"
              onClick={() => izbrisiAktivnost(task.id)}
            />
          </Box>
        ))}
      </Box>
      <Gumb
        variant="contained"
        onClick={spremiAktivnosti}
        sx={{}}
        buttonText="Spremi"
        icon={<SaveIcon />} // Pass SaveIcon as the icon prop
      />
    </Container>
  );
}

export default ToDoList;
