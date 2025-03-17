import React, { createContext, useState, useContext, ReactNode } from "react";

// Define Types for Global State
interface User {
  name: string;
  email: string;
}

interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  bearer: string;
  setBearer: (bearer: string) => void;
}

// Create Context with Default Values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Provider Component with Props Type
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bearer, setBearer] = useState("");

  return (
    <GlobalContext.Provider value={{ user, setUser, bearer, setBearer }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook for using the Global Context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
