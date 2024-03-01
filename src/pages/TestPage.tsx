import React from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import {
  GridColumnMenuColumnsItem,
  GridColumnMenuFilterItem,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
  GridColumnMenuSortItem,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ContextMenu from "../components/ContextMenu";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import DialogColumn from "../components/DialogColumn";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, editable: true },
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
];

function MenuCloseComponent(
  props: GridColumnMenuItemProps & { onOpenDialog: () => void }
) {
  // Note the addition of onOpenDialog in the props
  return (
    <Button
      color="primary"
      onClick={() => {
        props.onClick(); // This closes the menu
        props.onOpenDialog(); // This opens the dialog
      }}
    >
      Close Menu
    </Button>
  );
}

function CustomColumnMenu(
  props: GridColumnMenuProps & { onOpenDialog: () => void }
) {
  // Added onOpenDialog here to pass it down
  const logFieldAndHideMenu = () => {
    console.log(`Selected field: ${props.colDef.field}`);
  };

  const itemProps = {
    colDef: props.colDef,
    onClick: logFieldAndHideMenu,
    onOpenDialog: props.onOpenDialog, // Pass the onOpenDialog function through
  };

  return (
    <>
      <Stack px={0.5} py={0.5}>
        <GridColumnMenuSortItem {...itemProps} />
        {itemProps.colDef.field === "desk" ? (
          <GridColumnMenuFilterItem {...itemProps} />
        ) : null}
      </Stack>
      <Divider />
      <Stack px={0.5} py={0.5}>
        <GridColumnMenuColumnsItem {...itemProps} />
        <MenuCloseComponent {...itemProps} />
      </Stack>
    </>
  );
}

export default function TestPage() {
  const [open, setOpen] = useState(false);
  const [cellValue, setCellValue] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [editableColumn, setEditableColumn] = useState<string | null>(null);
  const [columnsConfig, setColumnsConfig] = useState<GridColDef[]>(columns);
  const [editValue, setEditValue] = useState("");

  const [selectedColumnName, setSelectedColumnName] = useState("");

  const handleRowSelectionChange = (newSelectionModel) => {
    console.log("Row selection changed:", newSelectionModel); // Log the new selection model
    setRowSelectionModel(newSelectionModel);
    const selectedData = rows.filter((row) =>
      newSelectionModel.includes(row.id)
    );
    console.log("Selected data based on new selection model:", selectedData); // Log the selected data
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
  };

  const menuItems = [
    {
      label: "Delete",
      onClick: () => console.log("Delete action"),
      menuText: "Delete",
    },
  ];

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSelectColumnName = (columnName: string) => {
    setSelectedColumnName(columnName); // Update state with the selected column name
    setEditableColumn(columnName); // Also set the editableColumn to the selected column name
    handleOpenDialog(); // Open the dialog
  };

  const applyEdit = () => {
    console.log("Applying edit for column:", editableColumn); // Log which column is being edited
    const newColumns = columnsConfig.map((col) => {
      if (col.field === editableColumn) {
        console.log(
          "Updating column header name from:",
          col.headerName,
          "to:",
          editValue
        ); // Log the change
        return { ...col, headerName: editValue };
      }
      return col;
    });
    setColumnsConfig(newColumns);
    setEditableColumn(null);
    setEditValue("");
    console.log("Columns config after edit:", newColumns); // Log the new columns configuration
  };

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
          columns={columnsConfig}
          onCellClick={onCellClick}
          onCellDoubleClick={handleCellClick}
          slots={{
            columnMenu: (props) => (
              <CustomColumnMenu
                {...props}
                onOpenDialog={() => handleSelectColumnName(props.colDef.field)}
              />
            ),
          }}
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
      <DialogColumn
        open={open}
        onClose={handleClose}
        editValue={editValue}
        setEditValue={setEditValue}
        onClick={applyEdit} // Assuming this changes the state directly
      />
    </Box>
  );
}
