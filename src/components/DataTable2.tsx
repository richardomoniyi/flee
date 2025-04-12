import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  //   GridToolbarQuickFilter,
  GridToolbar,
  //   GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from 'react-icons/hi2';

interface DataTableProps {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  includeActionColumn: boolean;
  //onRowClick?: GridEventListener<"rowClick">;
  //onSelectionChange: (selectedIds: number[]) => void;
  onActionClick?: (row: any, action:string) => void;
  onSelectionChange?: (selectionModel: GridRowSelectionModel) => void;
}

const DataTable2: React.FC<DataTableProps> = ({
  columns,
  rows,
  slug,
  includeActionColumn,
  onActionClick,
  onSelectionChange
}) => {
  //const navigate = useNavigate();
  console.log(slug)

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    minWidth: 200,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      //console.log(params.row.id)
      return (
        <div className="flex items-center">
          {/* <div to={`/${props.slug}/${params.row.id}`}> */}
          <button
           onClick={() => onActionClick?.(params.row,'E')}
            className="btn btn-square btn-ghost"
          >
            <HiOutlinePencilSquare />
          </button>
          <button
            onClick={() => onActionClick?.(params.row,'D')}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineTrash />
          </button>
          <button
            onClick={() => onActionClick?.(params.row,'A')}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineEye />
          </button>
        </div>
      );
    },
  };

  if (includeActionColumn === true) {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          columns={[...columns, actionColumn]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          //onRowClick={onRowClick} 
          onRowSelectionModelChange={onSelectionChange}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          columns={[...columns]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          //onRowClick={onRowClick} 
          onRowSelectionModelChange={onSelectionChange}
        />
      </div>
    );
  }
};

export default DataTable2;
