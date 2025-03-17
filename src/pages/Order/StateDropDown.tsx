import React from "react";

// Define states/provinces for different countries
const statesByCountry: Record<string, string[]> = {
  Nigeria: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
    "Sokoto", "Taraba", "Yobe", "Zamfara"
  ],
  USA: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
    "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
  ],
  UK: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ]
};

interface StateDropdownProps {
  name: string;
  country: string; // The selected country
  value: string; // Controlled value for the state
  onChange: (state: string) => void; // Function to update the selected state
}

const StateDropDown: React.FC<StateDropdownProps> = ({ name, country, value, onChange }) => {
  // Get the states based on the selected country, or an empty array if country is not found
  const states = statesByCountry[country] || [];

  return (
    <div>
      <label htmlFor={name}>State/Province:</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded"
        disabled={states.length === 0} // Disable dropdown if no states available
      >
        <option value="">-- State/Province --</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropDown;
