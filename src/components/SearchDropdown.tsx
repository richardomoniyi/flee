import React, { useState, useEffect, useCallback } from "react";

interface SearchDropdownProps {
  apiUrl: string; // API endpoint
  label?: string; // Optional label for input
  onSelect: (selectedValue: string, index: number) => void; // Callback with value & index
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ apiUrl, label, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce function to delay API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch options from API (Debounced)
  const fetchOptions = useCallback(
    debounce((query: string) => {
      if (query.length > 1) {
        setLoading(true);
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const filteredOptions = data
              .map((item: any) => item.name) // Adjust based on API response
              .filter((name: string) => name.toLowerCase().includes(query.toLowerCase()));

            setOptions(filteredOptions);
            setShowDropdown(filteredOptions.length > 0);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      } else {
        setShowDropdown(false);
      }
    }, 500),
    [apiUrl]
  );

  // Handle input change with debounced API call
  useEffect(() => {
    fetchOptions(searchTerm);
  }, [searchTerm, fetchOptions]);

  // Handle option selection
  const handleSelect = (option: string, index: number) => {
    setSearchTerm(option);
    setSelectedIndex(index);
    setShowDropdown(false);
    onSelect(option, index); // Return value & index to parent
  };

  return (
    <div style={{ width: "300px", margin: "20px auto", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={searchTerm}
          placeholder={label}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: "100%", padding: "8px", borderRadius: "4px", 
            border: "1px solid #ccc", marginRight: "8px" 
          }}
        />
        {loading && <span className="spinner"></span>}
      </div>

      {showDropdown && (
        <select 
          size={5}
          onChange={(e) => handleSelect(e.target.value, e.target.selectedIndex)}
          style={{
            width: "100%",
            position: "absolute",
            top: "40px",
            left: "0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Spinner Styles */}
      <style>
        {`
          .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            border-top: 3px solid #3498db;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SearchDropdown;
