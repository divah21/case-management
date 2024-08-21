import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ordersStatusData } from 'data/ordersStatusData';
import { Box, Button, Divider, Grid, Modal, SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import StatusChip from 'components/chips/StatusChip';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridFooter from 'components/common/DataGridFooter';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridApi,
  GridColDef,
  GridActionsCellItem,
  GridRenderEditCellParams,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid';

interface OrdersStatusTableProps {
  searchText: string;
}

const OrdersStatusTable = ({ searchText }: OrdersStatusTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [rows, setRows] = useState(ordersStatusData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectedRow, setSelectedRow] = useState<GridRowModel | null>(null);

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleClose = () => setSelectedRow(null);

  const handleViewClick = (id: GridRowId) => () => {
    const rowData = rows.find((row) => row.id === id);
    setSelectedRow(rowData || null);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'CR',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    {
      field: 'client',
      headerName: 'Complainant Name',
      flex: 2,
      minWidth: 180,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon icon="mingcute:user-2-fill" color="neutral.main" fontSize="body2.fontSize" />
          <Typography variant="caption" mt={0.25} letterSpacing={0.5}>
          Complainant Name
          </Typography>
        </Stack>
      ),
      valueGetter: (params: { name: string; email: string }) => {
        return `${params.name} ${params.email}`;
      },
      renderCell: (params) => {
        return (
          <Stack direction="column" alignSelf="center" justifyContent="center" sx={{ height: 1 }}>
            <Typography variant="subtitle1" fontSize="caption.fontSize">
              {params.row.client.name}
            </Typography>
          </Stack>
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: 'date',
      type: 'date',
      headerName: 'Date',
      editable: true,
      minWidth: 100,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon icon="mdi:calendar" color="neutral.main" fontSize="body1.fontSize" />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Date
          </Typography>
        </Stack>
      ),
      renderCell: (params) => format(new Date(params.value), 'MMM dd, yyyy'),
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 120,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.875}>
          <IconifyIcon
            icon="carbon:checkbox-checked-filled"
            color="neutral.main"
            fontSize="body1.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Status
          </Typography>
        </Stack>
      ),
      renderCell: (params) => {
        return (
          <Stack direction="column" alignSelf="center" justifyContent="center" sx={{ height: 1 }}>
            <StatusChip status={params.value} />
          </Stack>
        );
      },
      renderEditCell: (params: GridRenderEditCellParams) => {
        const handleChange = (event: SelectChangeEvent<string>) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: event.target.value,
          });
        };
        return (
          <Select value={params.value} onChange={handleChange} fullWidth>
            <MenuItem value="solved">Solved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        );
      },
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Location',
      sortable: false,
      flex: 1,
      minWidth: 120,
      resizable: false,
      editable: true,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon
            icon="healthicons:geo-location"
            color="neutral.main"
            fontSize="h5.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Location
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'total',
      headerName: 'Case Short Description',
      headerAlign: 'right',
      align: 'right',
      sortable: false,
      minWidth: 120,
      flex: 1,
      resizable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      minWidth: 180, // Adjust minWidth as needed
      flex: 1,
      cellClassName: 'actions',
      resizable: false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        const actions = [];

        // Add View button
        actions.push(
          <button
            onClick={handleViewClick(id)}
            style={{
              marginRight: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: '#475569',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            View
          </button>,
        );

        if (isInEditMode) {
          // Add Save and Cancel buttons when in edit mode
          actions.push(
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="primary.main"
                  icon="mdi:content-save"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Save"
              onClick={handleSaveClick(id)}
              size="small"
            />,
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="text.secondary"
                  icon="iconamoon:sign-times-duotone"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Cancel"
              onClick={handleCancelClick(id)}
              size="small"
            />,
          );
        } else {
          // Add Edit and Delete buttons when not in edit mode
          actions.push(
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  icon="fluent:edit-32-filled"
                  color="text.secondary"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Edit"
              onClick={handleEditClick(id)}
              size="small"
            />,
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  icon="mingcute:delete-3-fill"
                  color="text.secondary"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Delete"
              onClick={handleDeleteClick(id)}
              size="small"
            />,
          );
        }

        return actions;
      },
    },
  ];

  return (
    <>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        rowHeight={80}
        editMode="row"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        checkboxSelection
        pageSizeOptions={[6]}
        disableColumnMenu
        disableVirtualization
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          pagination: DataGridFooter,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
       <Modal
      open={!!selectedRow} // Open modal if a row is selected
      onClose={handleClose}
      aria-labelledby="view-case-modal"
      aria-describedby="view-case-modal-description"
    >
      <Box
        sx={{
          width: '90%',
          height: '95%',
          backgroundColor: '#081028',
          color: '#fff',
          padding: '50px',
          margin: 'auto',
          marginTop: '2%',
          borderRadius: '8px',
          overflowY: 'auto',
        }}
      >
        {selectedRow && (
          <Grid container spacing={3} sx={{ paddingBottom: 10 }}>

            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header" color='primary'>
                Case Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary.main' }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                CR: {selectedRow.id}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Complainant: </strong> {selectedRow.client.name}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {selectedRow.date.toDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {selectedRow.status}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {selectedRow.country}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Total:</strong> {selectedRow.total}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3" className="sub-header" color='primary'>
                Complainant Information
              </Typography>
            </Grid>

            

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Complainant Name:</strong> {selectedRow.complainant_name}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Complainant Contact:</strong> {selectedRow.complainant_contact}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Complainant Address:</strong> {selectedRow.complainant_address}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3" className="sub-header" color='primary'>
                Accused Information
              </Typography>
            </Grid>

           

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Accused Name:</strong> {selectedRow.accused_name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" className="sub-header" color='primary'>
                Case Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Offence:</strong> {selectedRow.offence}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Date of Occurrence:</strong> {selectedRow.date_occurance}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Place of Occurrence:</strong> {selectedRow.place_of_occurance}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Modus Operandi:</strong> {selectedRow.mod_operandi}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Property List:</strong> {selectedRow.property_list}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Value Stolen:</strong> {selectedRow.value_stolen}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Value Recorded:</strong> {selectedRow.value_recorded}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Exhibit Book Reference:</strong> {selectedRow.exhibit_book_ref}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Investigation Officer:</strong> {selectedRow.investigation_officer}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary.main' }} />
            </Grid>

          </Grid>
        )}
        <Button variant='contained' color='primary' onClick={handleClose} style={{ height: 40 }}  >
          Close
        </Button>
      </Box>
    </Modal>
    </>
  );
};

export default OrdersStatusTable;
