import React, { useState, useRef } from "react";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CheckBoxComponent from "../components/CheckBoxComponent";
import Gumb from "../components/Gumb";
import InputField from "../components/InputField";
import RemoveButton from "../components/RemoveButton";

interface Task {
  id: number;
  title: string;
  checked: boolean;
}

function ToDoList() {
  const aktivnostRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Operi suđe", checked: false },
    { id: 2, title: "Uči", checked: false },
    { id: 3, title: "Ispit", checked: false },
  ]);

  const handleCheckboxChange = (taskId: number) => {
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
        { id: prevTasks.length + 1, title: aktivnost, checked: false },
      ]);
    }
  };

  const izbrisiAktivnost = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Container>
      <InputField label="Unesi aktivnost" inputRef={aktivnostRef} />
      <Gumb
        variant="contained"
        buttonText="Dodaj aktivnost"
        onClick={dodajAktivnost}
      />
      <Box
        width={600}
        height={500}
        sx={{ border: "2px solid grey", overflow: "auto" }}
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
                  color: task.checked ? "none" : "black",
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
    </Container>
  );
}

export default ToDoList;
