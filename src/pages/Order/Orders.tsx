import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchOrders } from "./OrderData";
import AddOrder from "./AddOrder";
import { formatDate } from "../../commons/Utility";
import AddDispatch from "../Dispatch/AddDispatch";
import MakePayment from "../Payment/MakePayment";

const Orders = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editFlag, setEditFlag] = React.useState(false);
  const [isDispatch, setIsDispatch] = React.useState(false);
  const [order, setOrder] = React.useState("0");
  const [canPay, setCanPay] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["alldrivers",isOpen],
    queryFn: fetchOrders,
  });
  console.log("Edit Flag", editFlag);

  const handleButtonClick = (row: any, action: string) => {
    setIsDispatch(false);
    //console.log("Action:", action);
    setOrder("" + row.id);
    if (action === "E") {
      setIsOpen(true);
      setEditFlag(true);
    } else if (action === "A") {
      setIsDispatch(true);
      setEditFlag(true);
    }
  };
 
  const handleSelectionChange = (selectionModel: any) => {
    console.log('Selected Rows:', selectionModel);
    setSelectedRows(selectionModel);
   
    
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "orderId",
      headerName: "Order ID",
      minWidth: 20,
      type: "string",
      flex: 1,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      minWidth: 40,
      type: "string",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "pickupName",
      type: "string",
      headerName: "Sender name",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "pickupPhone",
      type: "string",
      headerName: "Sender Phone",
      minWidth: 30,
      flex: 1,
    },
    {
      field: "pickupDate",
      headerName: "Pickup Date",
      minWidth: 40,
      type: "string",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "dropoffName",
      type: "string",
      headerName: "Receiver name",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "paid",
      headerName: "Paid?",
      type: "string",
      minWidth: 10,
      flex: 1,
      renderCell: (params) => params.value === '1' ? "Paid":"Not Paid",
    },
    {
      field: "dropoffDate",
      headerName: "Dropoff Date",
      minWidth: 40,
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
    setIsOpen(true);
    setEditFlag(false);
  };
  const handlePayment = () => {
   
    try{
    if (selectedRows.length !== 1)
    {
      toast.error("Select ONE Order to Pay!", {
        id: "orderPay",
      });
      return;
    }
    setOrder(selectedRows[0])
    setEditFlag(true);
    setCanPay(true);
  }catch(Exception){
    setCanPay(false);
    toast.error("Select an Order to Pay!", {
      id: "orderPay",
    });
  }
  };

console.log("CanPay",canPay);
  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Orders
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Orders Found
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={handleAdd}
              style={{
                padding: "8px 16px",
                backgroundColor: isLoading ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              disabled={isLoading}
            >
              Add New Order +
            </button>

            {data && data.length > 0 && (
              <button
                onClick={handlePayment}
                style={{
                  padding: "8px 16px",
                  backgroundColor: isLoading ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                disabled={isLoading}
              >
                Make Payment +
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
            onSelectionChange={handleSelectionChange}
          />
        ) : isSuccess ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={data}
            includeActionColumn={true}
            //onRowClick={handleRowClick}
            onActionClick={handleButtonClick}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          <>
            <DataTable
              slug="orders"
              columns={columns}
              rows={[]}
              includeActionColumn={true}
              //onRowClick={handleRowClick}
              onActionClick={handleButtonClick}
              onSelectionChange={handleSelectionChange}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}
        {isOpen && (
          <AddOrder
            id={order}
            slug={"order"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editFlag={editFlag}
          />
        )}
        {isDispatch && (
          <AddDispatch
            id={order}
            slug={"dispatch"}
            isOpen={isDispatch}
            setIsOpen={setIsDispatch}
            editFlag={editFlag}
          />
        )}
         {canPay && (
          <MakePayment
            id={order}
            slug={"payment"}
            isOpen={canPay}
            setIsOpen={setCanPay}
            editFlag={editFlag}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
