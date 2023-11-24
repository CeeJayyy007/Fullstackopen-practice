import { useState } from "react";

const CountryList = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const countries = [
    { name: "Nigeria", id: "1" },
    { name: "Canada", id: "2" },
    { name: "Spain", id: "3" },
    { name: "Mexico", id: "4" },
  ];

  const handleSelection = (countryName) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.includes(countryName)
        ? prevSelected.filter((country) => country !== countryName)
        : [...prevSelected, countryName]
    );
  };

  const handleSelectAll = () => {
    setSelectedCountries(
      selectedCountries.length === countries.length
        ? []
        : countries.map((item) => item.name)
    );
  };

  console.log(selectedCountries);

  return (
    <div className="App">
      <h1>Checkboxes</h1>
      <div>
        <input
          type="checkbox"
          checked={selectedCountries.length === countries.length}
          onChange={handleSelectAll}
        />
        Select All
      </div>
      {countries.map((country) => (
        <div key={country.name}>
          <input
            type="checkbox"
            value={country.name}
            checked={selectedCountries.includes(country.name)}
            onChange={() => handleSelection(country.name)}
          />
          {country.name}
        </div>
      ))}

      <h4>Selected Country: </h4>
      <ul>
        {selectedCountries.map((country) => (
          <li key={country.id + country}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
