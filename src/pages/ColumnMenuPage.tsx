import * as React from "react";
import {
  DataGrid,
  GridColumnMenuFilterItem,
  GridColumnMenuSortItem,
  GridColumnMenuColumnsItem,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DialogColumn from "../components/DialogColumn";
import { useState } from "react";

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

export default function ColumnMenuPage() {
  const [open, setOpen] = useState(false);
  const [selectedColumnName, setSelectedColumnName] = useState("");

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectColumnName = (columnName: string) => {
    setSelectedColumnName(columnName); // Update state with the selected column name
    handleOpenDialog(); // Open the dialog
  };
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 20,
    maxColumns: 5,
  });

  const applyEdit = () => {
    console.log("test");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        slots={{
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
        editValue={selectedColumnName}
        onEditValueChange={setSelectedColumnName}
        onClick={applyEdit} // Assuming this changes the state directly
      />
    </div>
  );
}
