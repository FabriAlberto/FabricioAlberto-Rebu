import React from "react";
import Search from "./Search";
import RemoveFiltersButton from "./RemoveFiltersButton";
import CountrySelectFilter from "./CountrySelectFilter";
import SectorSelectFilter from "./SectorSelectFilter";

const Filter = () => {
  return (
    <div className="w-full flex gap-3 flex-wrap flex-column md:flex-row">
      <Search />
      <CountrySelectFilter />
      <SectorSelectFilter/>
      <RemoveFiltersButton />
    </div>
  );
};

export default Filter;
