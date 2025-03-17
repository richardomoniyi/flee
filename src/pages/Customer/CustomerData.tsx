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
const getAuthToken = (): string => {
  return localStorage.getItem("token") || "";
};
const apiUrl = "http://127.0.0.1:8080/Flee/app";//env.REACT_APP_API_URL;
//const environment = process.env.REACT_APP_ENVIRONMENT;
export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${apiUrl}/customer/`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
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
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }
  const data: Customer = await response.json();
  return data;
};
export const saveCustomer = (customer: any) => {
  console.log(customer);
  const c = JSON.parse(customer);
  const resp = postData(`${apiUrl}/customer/`,"POST", c)
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error.message));
   console.log(resp);
};
export const delCustomer = async (id: string): Promise<void> => {
  try {
      const response = await fetch(`${apiUrl}/customer/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
          },
      });

      if (!response.ok) {
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
      "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
    },
    body: JSON.stringify(data),
  });
  console.log('PostData::',response)
  if (!response.ok) {
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
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
      },
    };

    if (method === "POST" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
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
