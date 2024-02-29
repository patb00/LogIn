import React, { useState } from "react";
import CDDDSDataTable from "../components/CDDSDataTable";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const TablicaPage = () => {
  const [firstName, setFirstName] = useState("");
  const [clearSelectionCounter, setClearSelectionCounter] = useState(false);

  const handleClearSelections = () => {
    setClearSelectionCounter((prev) => !prev);
  };

  const handleRowClick = (selectedRow) => {
    const row = selectedRow;
    const firstName = row.firstName;
    setFirstName(firstName);
  };

  const removeFirstName = () => {
    setFirstName("");
  };
  console.log(firstName);

  const menuItems = [
    {
      label: "Delete",
      onClick: () => console.log("Delete action"),
      menuText: "Test",
    },
  ];

  return (
    <Box>
      <CDDDSDataTable
        columns={columns}
        rows={rows}
        onRowSelected={handleRowClick}
        onRowDeselected={removeFirstName}
        showStatusColumn={false}
        checkboxSelection={true}
        removeCheckboxes={clearSelectionCounter}
        menuItem={menuItems}
      />
      <Button onClick={handleClearSelections} variant="contained">
        Clear Selection
      </Button>
    </Box>
  );
};

export default TablicaPage;
