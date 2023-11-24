import { useState } from "react";

const UpdatedCountryList = () => {
  const countries = [
    { name: "Nigeria", id: "1" },
    { name: "Canada", id: "2" },
    { name: "Spain", id: "3" },
    { name: "Mexico", id: "4" },
  ];

  const [selectedCountries, setSelectedCountries] = useState(new Set());

  const handleSelection = (countryName) => {
    const newSelectedCountries = new Set(selectedCountries);

    if (newSelectedCountries.has(countryName)) {
      newSelectedCountries.delete(countryName);
    } else {
      newSelectedCountries.add(countryName);
    }

    setSelectedCountries(newSelectedCountries);
  };

  const handleSelectAll = () => {
    const allSelectedCountries = new Set(selectedCountries);

    if (allSelectedCountries.size === countries.length) {
      allSelectedCountries.clear();
      setSelectedCountries(allSelectedCountries);
    } else {
      countries.forEach((country) => {
        allSelectedCountries.add(country.name);
      });

      setSelectedCountries(allSelectedCountries);
    }
  };

  console.log(selectedCountries);

  return (
    <div className="App">
      <h1>Checkboxes</h1>
      <div>
        <input
          type="checkbox"
          checked={selectedCountries.size === countries.length}
          onChange={handleSelectAll}
        />
        Select All
      </div>
      {countries.map((country) => (
        <div key={country.name}>
          <input
            type="checkbox"
            value={country.name + country.id}
            checked={selectedCountries.has(country.name)}
            onChange={() => handleSelection(country.name)}
          />
          {country.name}
        </div>
      ))}
      <h4>Selected Country: </h4>
      <ul>
        {Array.from(selectedCountries).map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default UpdatedCountryList;
