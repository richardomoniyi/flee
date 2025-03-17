import React, { useState } from "react";

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];
interface StateDropdownProps {
    name: string;
    value: string; // Controlled value
    onChange: (state: string) => void; // Function to update form state
  }
  
  const StateDropDown: React.FC<StateDropdownProps> = ({ name, value, onChange }) => {
    return (
      <div>
        <label htmlFor={name}>Select a State:</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Select State --</option>
          {statesOfNigeria.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    );
  };
  

export default StateDropDown;
