import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatDate, formatToNaira } from "../../commons/Utility";
import { getUserProfile } from "../../commons/Utility";
import DataTable2 from "../../components/DataTable2";
import AutoTextBox from "../../components/AutoTextBox";

const Reporter = () => {
  const queryClient = useQueryClient();

  // State for filters
  const [customerId, setCustomerId] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch data based on filters
  interface ReportData {
    id: string;
    description: string;
    debit: number;
    credit: number;
    transdate: string;
  }
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const searchCustomerUrl = `${apiUrl}/customer/search`;
  const { isLoading, isError, isSuccess, data } = useQuery<ReportData[]>({
    queryKey: ["reportdata", customerId, beginDate, endDate],
    queryFn: () => fetchPayments(customerId, beginDate, endDate),
    enabled: !!customerId && !!beginDate && !!endDate, // Only fetch when all filters are set
  });

  const fetchPayments = async (
    customerId: string,
    beginDate: string,
    endDate: string
  ): Promise<ReportData[]> => {
    const response = await fetch(
      `${apiUrl}/report/customer/${customerId}/${beginDate}/${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getUserProfile()?.token}`, // Send Authorization header
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }
    return response.json();
  };
  interface Option {
    id: string; // or number, depending on your API response
    name: string; // or any other property that represents the option
    phone:string;
    email:string;
    address:string;
    businessName:string;
  }
 const handleSenderNameSelect = (selectedOption: Option) => {
  console.log("Selected option:", selectedOption.id);
  if (selectedOption.id == "0") setCustomerId("-1");
  else setCustomerId(selectedOption.id);
 }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "transdate",
      type: "string",
      headerName: "Date",
      minWidth: 60,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "description",
      type: "string",
      headerName: "Description",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "debit",
      type: "number",
      headerName: "Debit (Orders)",
      minWidth: 60,
      flex: 1,
      renderCell: (params) => formatToNaira(params.value),
    },
    {
      field: "credit (Payments)",
      headerName: "Credit",
      type: "number",
      minWidth: 60,
      flex: 1,
      renderCell: (params) => formatToNaira(params.value),
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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Filters applied:", { customerId, beginDate, endDate });
    queryClient.invalidateQueries({
      queryKey: ["reportdata", customerId,beginDate, endDate],
    });
  };
/*
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border p-2 rounded w-1/4"
          />*/

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        {/* Filter Card */}
        <form
          onSubmit={handleFilterSubmit}
          className="w-full flex gap-4 items-center mb-4"
        >

          <AutoTextBox
            id="customerId"
            value={customerId}
            apiUrl={searchCustomerUrl} // Replace with your actual API URL
            placeholder="Customer ID"
            onSelect={handleSenderNameSelect} // Pass external event handler
            className="w-1/4" // Reduced width
          />
          <input
            type="date"
            placeholder="Begin Date"
            value={beginDate}
            onChange={(e) => setBeginDate(e.target.value)}
            className="border p-2 rounded w-1/4"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-1/4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!customerId || !beginDate || !endDate}
          >
            Apply Filters
          </button>
        </form>

        {/* DataTable */}
        {isLoading ? (
          <DataTable2
            slug="payments"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
            onActionClick={() => {}}
          />
        ) : isSuccess ? (
          <DataTable2
            slug="payments"
            columns={columns}
            rows={data}
            includeActionColumn={false}
            onActionClick={() => {}}
          />
        ) : (
          <div className="w-full flex justify-center">
            Error while getting the data!
          </div>
        )}
      </div>
    </div>
  );
};

export default Reporter;
