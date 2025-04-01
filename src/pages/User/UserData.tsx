export interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  verify:boolean;
  category:number;
  enabled: boolean;
  logindate: string;
  created: string;
}
export interface Credential {
  email: string;
  password: string;
  token: string;
}
export interface Answer{
  status:number;
  message:string;
}
const getAuthToken = (): string => {
  return localStorage.getItem("token") || "";
};
//const apiUrl = "http://127.0.0.1:8080/Flee/app"; //env.REACT_APP_API_URL;
//const environment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchUsers = async (): Promise<User[]> => {
  console.log("Token:",getAuthToken());
  const response = await fetch(`${apiUrl}/userdata/`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Unauthorized access - please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }else
    throw new Error("Failed to fetch users");
  }
  return response.json();
};
export const login = async (login: Credential) => {
  console.log(login);
  const resp = await postData(`${apiUrl}/userdata/signin/`, "POST", login);
  console.log("login resp:",resp);
  return resp;
};
export const forgotFetch = async (email: string):Promise<Answer> => {
  const emailLoad = {email:email}
  const resp = await postData(`${apiUrl}/userdata/forgotpassword/`, "POST", emailLoad);
  console.log("forgot resp:",resp);
  return resp as Answer;
};
export const changeFetch = async (login: Credential):Promise<Answer> => {
  const resp = await postData(`${apiUrl}/userdata/changepassword/`, "POST", login);
  console.log("changepassword resp:",resp);
  return resp as Answer;
};
//fetchDriver
export const fetchUser = async (id: string): Promise<User> => {
  //console.log('fetchDriver::',id.trim());
  const response = await fetch(`${apiUrl}/userdata/` + id,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Unauthorized access - please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }else
    throw new Error("Failed to fetch customer");
  }
  const data: User = await response.json();
  return data;
};
export const saveUser = (user: any) => {
  console.log(user);
  const u = JSON.parse(user);
  const resp = postData(`${apiUrl}/userdata/`, "POST", u);
  console.log(resp);
};
export const delUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/userdata/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.error("Unauthorized access - please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }else
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log(`Item with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
};

export const postData = async (url: string, method:string,data: any) => {
  console.log('PostData::request:',data);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`, // Send Authorization header
    },
    body: JSON.stringify(data),
  });
  console.log('PostData::response:',response)
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Unauthorized access - please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }else
    throw new Error("Failed to send data");
  }
  const text = await response.text();
  console.log("server response 2:",text);
  if (!text) {
    throw new Error("Empty response from server.");
  }

  const resp = JSON.parse(text); // Manually parse JSON
  return resp;//response.json();
};

export async function fetchDataResponse<T>(
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
    console.log("response::", response);
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.error("Unauthorized access - please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }else
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }
    const text = await response.text();
    console.log("server response:",text);
    if (!text) {
      throw new Error("Empty response from server.");
    }
  
    const resp = JSON.parse(text); // Manually parse JSON
    return resp;//(await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch data:" + error);
  }
}
