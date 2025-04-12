import React, { useState, useEffect } from "react";
import {getUserProfile} from "../commons/Utility"; // Update the path to the correct location

// Define types for the option and the props
export interface Option {
  id: string; // or number, depending on your API response
  name: string; // or any other property that represents the option
  phone:string;
  email:string;
  address:string;
  businessName:string;
}

interface SelectWithSearchProps {
  value: string;
  apiUrl: string;
  placeholder: string;
  onSelect: (option: Option) => void;
}

const AutoTextBox: React.FC<SelectWithSearchProps> = ({
  value,
  apiUrl,
  placeholder,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue.length === 0) {
      setOptions([]);
      return;
    }
    const fetchOptions = async () => {
      setLoading(true);
      try {
        if (inputValue.length < 3) return;
        //const response = await fetch(`${apiUrl}/${inputValue}`);
        //
        const response = await fetch(`${apiUrl}/${inputValue}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${getUserProfile()?.token}`, // Send Authorization header
              "Content-Type": "application/json", // Ensure JSON format
            },
          });
        const data = await response.json();
        console.log("data:",data);
        setOptions(data); // Assuming the API response is an array of options
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!selected) fetchOptions();
  }, [inputValue, apiUrl]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelected(false);
  };

  const handleSelect = (option: Option) => {
    console.log("handleSelect::Selected option:", option);
    onSelect(option);
    setInputValue(option.name); // Set input value to the selected option's name
    setOptions([]); // Close the dropdown after selection
    setSelected(true);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange} // Keeps user input
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />

      {loading && (
        <div className="absolute right-2 top-2">
          <svg
            className="animate-spin h-5 w-5 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
            ></path>
          </svg>
        </div>
      )}

      {inputValue.length > 0 && options.length > 0 && !loading && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto z-10">
          {options.map((option) => (
            <li
              id=""
              key={option.id}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoTextBox;
