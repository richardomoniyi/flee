export interface Dispatch {
  id: number;
  orderId: number;
  driverId: number;
  statusId:number;
  dispatchDate: string;
}
export interface DispatchData{
  id:number;
  orderid:string;
  orderdate:string;
  dispatchdate:string;
  drivername:string
  dispatchstatus:string;
}
interface Carrier {
  id: number;
  name: string;
  description: string;
  created: number; // Timestamp in milliseconds
}
export interface Answer{
  status:number;
  message:string;
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
  driverId: number,
  orderItem: string,
  orderDate: string,
}
export interface Driver {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  nextFullname: string;
  nextAddress: string;
  nextPhone: string;
  created: string;
}
import { getUserProfile, killProfile } from "../../commons/Utility";
//const apiUrl = "http://127.0.0.1:8080/Flee/app";//env.REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_API_URL;
export const searchDriverUrl = `${apiUrl}/driver/search`;

export const fetchDriver = async (id:string): Promise<Driver> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/driver/`+id,
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
    throw new Error("Failed to fetch driver");
  }
  const data: Driver = await response.json();
  return data;
};

export const fetchOrder = async (id:string): Promise<Order> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/orders/`+id,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  //console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      killProfile();
    }else
    throw new Error("Failed to fetch order");
  }
  const data: Order = await response.json();
  return data;
};

export const fetchDispatchs = async (): Promise<Dispatch[]> => {
  const response = await fetch(`${apiUrl}/dispatch/dispatcher/`,
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
export const fetchDispatch = async (id:string): Promise<Dispatch> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/dispatch/`+id,
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
    throw new Error("Failed to fetch driver");
  }
  const data: Dispatch = await response.json();
  return data;
};
export const saveDispatch = (dispatch: any) => {
  //console.log(order);
  //const c = JSON.parse(order);
  const resp = postData(`${apiUrl}/dispatch/`,"POST", dispatch)
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error.message));
   //console.log(resp);
   return resp;
};
export const saveDispatch1 = async (dispatch: any): Promise<Answer> => {
    console.log("dispatch Data 1:", dispatch);
    // Ensure driver is a valid object
    //const c = typeof dispatch === "string" ? JSON.parse(dispatch) : dispatch;
    // Await the API response
    //console.log("dispatch Data 2:", c);
    const resp = await postData(`${apiUrl}/dispatch/`, "POST", dispatch);
    console.log("Success:", resp);
    return resp as Answer; // Ensure this matches your expected Answer type
  
};
export const delDispatch = async (id: string): Promise<void> => {
  try {
      const response = await fetch(`${apiUrl}/dispatch/${id}`, {
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
    body: data,//JSON.stringify(data),
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
