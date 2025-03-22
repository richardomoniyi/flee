import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddCustomer from "./AddCustomer";
import { fetchCustomers, delCustomer } from "./CustomerData";
import XDialog from "../../components/XDialog";
import {formatDate} from "../../commons/Utility";


const Customers = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editFlag, setEditFlag] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [customer, setCustomer] = React.useState("0");
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["allcustomers",isOpen],
    queryFn: fetchCustomers,
  });
 // isOpen
  //console.log("Data", data);
  //console.log("Edit Flag", editFlag);
  // Define the row click event logic
  const handleButtonClick = (row: any, action: string) => {
    setIsOpenDialog(false);
    setCustomer("" + row.id);
    if (action === "E") {
      setIsOpen(true);
      setEditFlag(true);
    } else if (action === "D") {
      setIsOpenDialog(true);
    }
  };
  const handleDialogConfirm = () => {
    delCustomer(customer);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "firstname",
      type: "string",
      headerName: "Firstname",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "lastname",
      type: "string",
      headerName: "Lastname",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "businessName",
      headerName: "business Name",
      type: "string",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "string",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      type: "number",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => params.value === "" ? "0":params.value.toLocaleString(),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 50,
      type: "string",
      flex: 1,
    },
    {
      field: "created",
      headerName: "Created At",
      minWidth: 100,
      type: "string",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
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

  const handleAdd = () => {
    //console.log("Button handleAdd clicked! Count:");
    setIsOpen(true);
    setEditFlag(false);
    
  };
  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Customers
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Customers Found
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`btn ${isLoading ? "btn-disabled" : "btn-primary"}`}>
            Add New Customer +
          </button>
        </div>

        {isLoading ? (
          <DataTable
            slug="customers"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : isSuccess ? (
          <DataTable
            slug="customers"
            columns={columns}
            rows={data}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : (
          <>
            <DataTable
              slug="customers"
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
          <AddCustomer
            id={customer}
            slug={"customer"}
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

export default Customers;
