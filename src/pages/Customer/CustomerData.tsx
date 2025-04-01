import {getUserProfile, killProfile } from "../../commons/Utility";
export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  businessName: string;
  balance:number,
  enabled:boolean,
  category: string;
  discountId: string;
  created: string;
}
 export interface Answer{
    status:number;
    message:string;
  }


//const apiUrl = "http://127.0.0.1:8080/Flee/app";//env.REACT_APP_API_URL;
//const environment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${apiUrl}/customer/`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      killProfile();
    }else
    throw new Error("Failed to fetch users");
  }
  return response.json();
};
//fetchDriver
export const fetchCustomer = async (id:string): Promise<Customer> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/customer/`+id,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      killProfile();
    }else
    throw new Error("Failed to fetch customer");
  }
  const data: Customer = await response.json();
  return data;
};

export const saveCustomer = async (customer: any): Promise<Answer> => {
    console.log("Customer Data:", customer);
    // Ensure customer is a valid object
    const c = typeof customer === "string" ? JSON.parse(customer) : customer;
    // Await the API response
    const resp = await postData(`${apiUrl}/customer/`, "POST", c);
    console.log("Success:", resp);
    return resp as Answer; // Ensure this matches your expected Answer type
  
};
export const delCustomer = async (id: string): Promise<void> => {
  try {
      const response = await fetch(`${apiUrl}/customer/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
          },
      });

      if (!response.ok) {
        if (response.status === 401) {
          killProfile();
        }else
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      console.log(`Item with ID ${id} deleted successfully`);
  } catch (error) {
      console.error("Failed to delete item:", error);
  }
};

export const postData = async (url: string, method:string,data: any) => {
  console.log('PostData::',data);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
    },
    body: JSON.stringify(data),
  });
  console.log('PostData::',response)
  if (!response.ok) {
    if (response.status === 401) {
      killProfile();
    }else
    throw new Error("Failed to send data");
  }

  return response.json();
};

export async function fetchData2<T>(
  url: string,
  method: "GET" | "POST",
  data?: any
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
      },
    };

    if (method === "POST" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        killProfile();
      }else
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch data");
  }
}
