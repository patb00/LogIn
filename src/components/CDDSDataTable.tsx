import { useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  ListItemText,
  SelectChangeEvent,
  Tooltip,
  Box,
  Container,
} from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles.css";
import ContextMenu from "./ContextMenu";

interface StatusOption {
  id: string;
  name: string;
  color: string;
  statusDesc?: string;
}

interface DataTableProps {
  columns: GridColDef[];
  rows: GridValidRowModel[];
  checkboxSelection?: boolean;
  visibleColumnFields?: string[];
  paginationModel?: {
    page: number;
    pageSize: number;
  };
  onRowSelected: (rowIds: unknown) => void;
  onRowDeselected?: (rowIds: unknown) => void;
  showStatusColumn: boolean;
  statusOptions?: StatusOption[];
  setLoading?: boolean;
  sxObject?: object;
  color1?: string;
  color2?: string;
}

function DataTable({
  columns,
  rows,
  visibleColumnFields,
  paginationModel = { page: 0, pageSize: 20 },
  onRowSelected,
  onRowDeselected,
  showStatusColumn,
  statusOptions,
  setLoading,
  sxObject,
  checkboxSelection = false,
  color1 = "selectedRow3",
  color2 = "selectedRow4",
}: DataTableProps) {
  const [cellValue, setCellValue] = useState("");
  const [selectedRowId, setSelectedRowId] = useState<unknown | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<(unknown | null)[]>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const [alertInfoOpen, setAlertInfoOpen] = useState<{
    open: boolean;
    message?: string;
    severity?: AlertColor;
    alerttitle?: string;
  }>({ open: false, message: "" });

  const statusColumn: GridColDef = {
    field: "StatusFilter",
    headerName: "Status",
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      const status = statusOptions?.find(
        (status) => status.id === params.value
      );
      return (
        <Tooltip title={status?.statusDesc} placement="bottom-start" arrow>
          <FiberManualRecordIcon style={{ color: status?.color }} />
        </Tooltip>
      );
    },
    filterable: true,
    filterOperators: [
      {
        label: "Filter by status",
        value: "is",
        getApplyFilterFn: (filterItem) => {
          if (!filterItem.value) {
            return () => true;
          }
          return (params): boolean => {
            return filterItem.value.includes(params.value);
          };
        },
        InputComponent: ({ item, applyValue }) => {
          const handleChange = (
            event: SelectChangeEvent<typeof item.value>
          ) => {
            applyValue({ ...item, value: event.target.value });
          };

          return (
            <FormControl fullWidth>
              <InputLabel id="status-filter-select-label">Status</InputLabel>
              <Select
                sx={{ mx: 1 }}
                labelId="status-filter-select-label"
                multiple
                value={item.value || []}
                onChange={handleChange}
                input={<OutlinedInput label="Status" />}
                renderValue={(selected) =>
                  Array.isArray(selected) ? selected.join(", ") : ""
                }
              >
                {statusOptions?.map((option) => (
                  <MenuItem
                    sx={{ bgcolor: "lightgrey" }}
                    key={option.id}
                    value={option.name}
                  >
                    <Checkbox
                      checked={item.value?.includes(option.name) || false}
                    />
                    <ListItemText primary={option.name} />
                    <FiberManualRecordIcon
                      sx={{ ml: 2 }}
                      style={{ color: option.color }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        },
      },
    ],
  };

  const copyText = () => {
    navigator.clipboard
      .writeText(cellValue)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const onCellClick = (params: GridCellParams) => {
    setCellValue(params.value?.toString() || "");
  };

  const allColumns = showStatusColumn ? [statusColumn, ...columns] : columns;

  const handleSelectionModelChange = (selectionModel: unknown[]) => {
    setSelectedRowIds(selectionModel);

    if (selectionModel.length > selectedRowIds.length) {
      const newSelections = selectionModel.filter(
        (id) => !selectedRowIds.includes(id)
      );
      newSelections.forEach((id) => {
        const selectedRow = rows.find((row) => row.id === id);
        if (selectedRow) {
          onRowSelected(selectedRow);
        }
      });
    } else if (selectionModel.length < selectedRowIds.length) {
      const deselectedRows = selectedRowIds.filter(
        (id) => !selectionModel.includes(id)
      );
      deselectedRows.forEach((id) => {
        const deselectedRow = rows.find((row) => row.id === id);
        if (deselectedRow && onRowDeselected) {
          onRowDeselected(deselectedRow);
        }
      });
    }
  };

  const handleSelectionModelChange2 = (selectionModel: unknown[]) => {
    if (selectionModel.length > 0) {
      const newSelectedRowId = selectionModel[0];
      if (newSelectedRowId !== selectedRowId) {
        setSelectedRowId(newSelectedRowId);
        const selectedRow = rows.find((row) => row.id === newSelectedRowId);
        if (selectedRow) {
          onRowSelected(selectedRow);
        }
      }
    } else {
      // This block is now specifically for deselection
      if (selectedRowId !== null) {
        const deselectedRow = rows.find((row) => row.id === selectedRowId);
        if (deselectedRow && onRowDeselected) {
          onRowDeselected(deselectedRow);
        }
        setSelectedRowId(null);
      }
    }
  };

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

  return (
    <Container maxWidth={false}>
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
        <ContextMenu copyText={copyText}>
          <DataGrid
            sx={sxObject}
            rows={rows}
            columns={allColumns.filter(
              (column) =>
                !visibleColumnFields ||
                visibleColumnFields.includes(column.field)
            )}
            filterModel={filterModel}
            onFilterModelChange={setFilterModel}
            initialState={{
              pagination: {
                paginationModel,
              },
            }}
            loading={setLoading}
            slots={{ loadingOverlay: LinearProgress }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            onRowSelectionModelChange={
              checkboxSelection
                ? handleSelectionModelChange
                : handleSelectionModelChange2
            }
            checkboxSelection={checkboxSelection}
            rowCount={rows.length}
            onCellDoubleClick={handleCellClick}
            onCellClick={onCellClick}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? color1 : color2
            }
          />
        </ContextMenu>
      </Box>
    </Container>
  );
}

export default DataTable;
