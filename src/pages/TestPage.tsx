import React from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ContextMenu from "../components/ContextMenu";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import { useEffect } from "react";
import OpenDialog from "../components/OpenDialog";

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
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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

function TestPage() {
  const [open, setOpen] = useState(false);
  const [cellValue, setCellValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); //State Selected Rows
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleRowSelectionChange = (newSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
    const selectedData = rows.filter((row) =>
      newSelectionModel.includes(row.id)
    );
    setSelectedRows(selectedData);
  };

  const copyText = () => {
    navigator.clipboard
      .writeText(cellValue)
      .then(() => {
        console.log("Text copied to clipboard");
        setAlertInfoOpen({
          open: true,
          message: `Kopirana vrijednost: ${cellValue}`,
          severity: "success",
          alerttitle: "Uspješno kopirano",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setAlertInfoOpen({
          open: true,
          message: "Pogreška u kopiranju",
          severity: "error",
          alerttitle: "Pogreška",
        });
      });
  };

  // Include your existing useEffect hook here for handling the automatic closing of the alert

  const onCellClick = (params: GridCellParams) => {
    setCellValue(params.value?.toString() || "");
  };

  const [alertInfoOpen, setAlertInfoOpen] = useState<{
    open: boolean;
    message?: string;
    severity?: AlertColor;
    alerttitle?: string;
  }>({ open: false, message: "" });

  const handleCellClick = async (params: GridCellParams) => {
    if (params.value !== null && params.value !== undefined) {
      try {
        const valueToCopy =
          typeof params.value === "object"
            ? JSON.stringify(params.value)
            : params.value.toString();
        await navigator.clipboard.writeText(valueToCopy);

        setAlertInfoOpen({
          open: true,
          message: `Kopirana vrijednost: ${valueToCopy}`,
          severity: "success",
          alerttitle: "Uspješno kopirano",
        });
      } catch (err) {
        console.error("Failed to copy text: ", err);
        setAlertInfoOpen({
          open: true,
          message: "Pogreška u kopiranju",
          severity: "error",
          alerttitle: "Pogreška",
        });
      }
    } else {
      setAlertInfoOpen({
        open: true,
        message: "Prazno polje! ",
        severity: "info",
        alerttitle: "Info",
      });
    }
  };

  useEffect(() => {
    if (alertInfoOpen.open) {
      const timer = setTimeout(() => {
        setAlertInfoOpen((prevState) => ({
          ...prevState,
          open: false,
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertInfoOpen.open]);

  const handleClose = () => {
    setOpen(false);
    setRowSelectionModel([]);
    setSelectedRows([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const menuItems = [
    {
      label: "Delete",
      onClick: () => console.log("Delete action"),
      menuText: "Delete",
    },
  ];

  return (
    <Box sx={{ height: "80vh", overflow: "auto" }}>
      {alertInfoOpen.open && (
        <Alert
          severity={alertInfoOpen.severity}
          onClose={() => setAlertInfoOpen({ open: false })}
        >
          <AlertTitle>{alertInfoOpen.alerttitle}</AlertTitle>
          {alertInfoOpen.message}
        </Alert>
      )}

      <ContextMenu copyText={copyText} canCopy={true} menuItem={menuItems}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={onCellClick}
          onCellDoubleClick={handleCellClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelectionChange}
          rowSelectionModel={rowSelectionModel}
        />
      </ContextMenu>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: 50, height: 50, mt: 5 }}
        onClick={handleClickOpen}
      >
        Open Dialog
      </Button>
      <OpenDialog open={open} onClose={handleClose} rowData={selectedRows[0]} />
    </Box>
  );
}

export default TestPage;
