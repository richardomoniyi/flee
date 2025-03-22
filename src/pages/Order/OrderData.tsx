
interface Carrier {
  id: number;
  name: string;
  description: string;
  created: number; // Timestamp in milliseconds
}
export interface Order {
  pickupName: string,
  pickupStreet: string,
  pickupCity:string,
  pickupState:string,
  pickupCountry:string,
  pickupPhone: string,
  pickupDate: string,
  dropoffName: string,
  dropoffStreet: string,
  dropoffCity:string,
  dropoffState:string,
  dropoffCountry:string,
  dropoffPhone: string,
  dropoffDate: string,
  instruction: string,
  customerId: string,
  amount: number,
  carrierId: Carrier,
  carrierRate: number,
  discount: number,
  orderId: string,
  orderItem: string,
  orderDate: string,
  paid:string
}
const getAuthToken = (): string => {
  return localStorage.getItem("token") || "";
};
///util/order/seq
//const apiUrl = "http://127.0.0.1:8080/Flee/app";//env.REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_API_URL;
export const searchCustomerUrl = `${apiUrl}/customer/search`;
//const environment = process.env.REACT_APP_ENVIRONMENT;
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${apiUrl}/orders/`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
    console.log("STATUS:"+response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
  
};

//fetchDriver
export const fetchOrder = async (id:string): Promise<Order> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/orders/`+id,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  //console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  const data: Order = await response.json();
  return data;
};

export const saveOrder = (order: any) => {
  //console.log(order);
  //const c = JSON.parse(order);
  const resp = postData(`${apiUrl}/orders/`,"POST", order)
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error.message));
   //console.log(resp);
   return resp;
};
export const delOrder = async (id: string): Promise<void> => {
  try {
    console.log('delOrder:',id);
      const response = await fetch(`${apiUrl}/orders/${id}`, {
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
    body: data,//JSON.stringify(data),
  });
  console.log('PostResp::',response)
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
