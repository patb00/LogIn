import React, { useState } from "react";
import CDDDSDataTable from "../components/CDDSDataTable";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Button, Divider, Stack, TextField } from "@mui/material";
import {
  GridColumnMenuColumnsItem,
  GridColumnMenuFilterItem,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
  GridColumnMenuSortItem,
} from "@mui/x-data-grid";
import DialogColumn from "../components/DialogColumn";

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

function MenuCloseComponent(
  props: GridColumnMenuItemProps & { onOpenDialog: () => void }
) {
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
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default function TablicaPage() {
  const [firstName, setFirstName] = useState("");
  const [clearSelectionCounter, setClearSelectionCounter] = useState(false);
  const [editableColumn, setEditableColumn] = useState<string | null>(null);
  const [columnsConfig, setColumnsConfig] = useState<GridColDef[]>(columns);
  const [editValue, setEditValue] = useState("");
  const [selectedColumnName, setSelectedColumnName] = useState("");
  const [open, setOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

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

  const handleColumnHeaderDoubleClick = (param) => {
    setEditableColumn(param.field);
    const currentColumn = columnsConfig.find(
      (col) => col.field === param.field
    );
    setEditValue(currentColumn?.headerName || "");
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

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSelectColumnName = (columnName: string) => {
    setSelectedColumnName(columnName); // Update state with the selected column name
    setEditableColumn(columnName); // Also set the editableColumn to the selected column name
    handleOpenDialog(); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setRowSelectionModel([]);
  };

  return (
    <Box>
      <Box>
        <TextField
          sx={{ height: 20, mb: 2 }}
          value={editValue}
          onChange={handleEditChange}
        />
        <Button
          sx={{ m: 2, height: 30, width: 35 }}
          variant="outlined"
          onClick={applyEdit}
        >
          Change
        </Button>
      </Box>

      <CDDDSDataTable
        columns={columnsConfig}
        rows={rows}
        onRowSelected={handleRowClick}
        onRowDeselected={removeFirstName}
        showStatusColumn={false}
        checkboxSelection={true}
        removeCheckboxes={clearSelectionCounter}
        menuItem={menuItems}
        onColumnDoubleClick={handleColumnHeaderDoubleClick}
        slotsMenu={{
          columnMenu: (props) => (
            <CustomColumnMenu
              {...props}
              onOpenDialog={() => handleSelectColumnName(props.colDef.field)}
            />
          ),
        }}
      />
      <DialogColumn
        open={open}
        onClose={handleClose}
        editValue={editValue}
        setEditValue={setEditValue}
        onClick={applyEdit} // Assuming this changes the state directly
      />
      <Button onClick={handleClearSelections} variant="contained">
        Clear Selection
      </Button>
    </Box>
  );
}
