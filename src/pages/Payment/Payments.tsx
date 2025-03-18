import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchPayments, delDispatch } from "./PaymentData";
import XDialog from "../../components/XDialog";
import {formatDate} from "../../commons/Utility";



const Dispatchs = () => {
  const [isOpenDialog] = React.useState(false);
  const [dispatch] = React.useState("0");
  const [orderdate] = React.useState("");
  const [dispatchDate] = React.useState("");

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["dispatchkey"],
    queryFn: fetchPayments,
  });

 
  const handleDialogConfirm = () => {
    delDispatch(dispatch);
  };
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
      field: "orderId",
      type: "string",
      headerName: "Order ID",
      minWidth: 60,
      flex: 1,
    },
    {
      field: "paymentdate",
      type: "string",
      headerName: "Payment Date",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "businessName",
      headerName: "Payer Name",
      type: "string",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      type: "string",
      flex: 1,
      renderCell: (params) => params.value
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
  
  function handleButtonClick(_row: any, _action: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Payments
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Payments Found
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <DataTable
            slug="payments"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : isSuccess ? (
          <DataTable
            slug="payments"
            columns={columns}
            rows={data}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
          />
        ) : (
          <>
            <DataTable
              slug="payments"
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
