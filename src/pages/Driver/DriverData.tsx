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
const getAuthToken = (): string => {
  return localStorage.getItem("token") || "";
};
//const apiUrl = "http://127.0.0.1:8080/Flee/app";//env.REACT_APP_API_URL;
//const environment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchDrivers = async (): Promise<Driver[]> => {
  const response = await fetch(`${apiUrl}/driver/`,
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
export const fetchDriver = async (id:string): Promise<Driver> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/driver/`+id,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch driver");
  }
  const data: Driver = await response.json();
  return data;
};
export const saveDriver = (driver: any) => {
  //console.log(driver);
  const resp = postData(`${apiUrl}/driver/`,"POST", driver)
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error.message));
   console.log(resp);
};
export const delDriver = async (id: string): Promise<void> => {
  try {
      const response = await fetch(`${apiUrl}/driver/${id}`, {
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
