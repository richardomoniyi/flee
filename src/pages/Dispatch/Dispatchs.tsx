import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchDispatchs, delDispatch} from "./DispatchData";
import XDialog from "../../components/XDialog";
import {formatDate} from "../../commons/Utility";
import AddDispatch from "./AddDispatch";


const Dispatchs = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editFlag] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dispatch, setDispatch] = React.useState("0");
  const [orderdate, setOrderdate] = React.useState("");
  const [dispatchDate, setDispatchDate] = React.useState("");

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["dispatchkey",isOpen],
    queryFn: fetchDispatchs,
  });

  const handleButtonClick = (row: any, _action: string) => {
    setIsOpenDialog(false);
    setDispatch("" + row.id);
 
    setOrderdate(row.orderdate);
    setDispatchDate(row.dispatchDate);
    /*if (action === "E") {
      setIsOpen(true);
      setEditFlag(true);
    } else if (action === "D") {
      setIsOpenDialog(true);
    }*/
  };
  const handleDialogConfirm = () => {
    delDispatch(dispatch);
  };
  /*
   id:number;
  orderid:string;
  orderdate:string;
  dispatchdate:string;
  drivername:string
  dispatchstatus:string;
  */
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "orderdate",
      type: "string",
      headerName: "Order Date",
      minWidth: 60,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "orderid",
      type: "string",
      headerName: "Order ID",
      minWidth: 60,
      flex: 1,
    },
    {
      field: "dispatchdate",
      type: "string",
      headerName: "Dispatch Date",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "drivername",
      headerName: "Assigned To",
      type: "string",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "dispatchstatus",
      headerName: "Status",
      minWidth: 50,
      type: "string",
      flex: 1,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "promiseProducts" });
    }
    if (isError) {
      toast.error("Error while getting the data!", {
        id: "promiseProducts",
      });
    }
    if (isSuccess) {
      toast.success("Loaded!", {
        id: "promiseProducts",
      });
    }
  }, [isError, isLoading, isSuccess]);

  console.log("orderdate",orderdate);
  console.log("dispatchDate",dispatchDate);
  
  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Dispatch Events
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Events Found
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <DataTable
            slug="dispatchs"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : isSuccess ? (
          <DataTable
            slug="dispatchs"
            columns={columns}
            rows={data}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : (
          <>
            <DataTable
              slug="dispatchs"
              columns={columns}
              rows={[]}
              includeActionColumn={true}
              //onRowClick={handleRowClick}
              onActionClick={handleButtonClick}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddDispatch
            id={dispatch}
            slug={"dispatch"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editFlag={editFlag}
          />
        )}
        {isOpenDialog && (
          <XDialog
            title="Delete Confirmation"
            message="Are you sure you want to delete this item?"
            onConfirm={handleDialogConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Dispatchs;
