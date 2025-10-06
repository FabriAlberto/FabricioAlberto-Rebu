"use client";
import { MultiSelect } from "@/components/common/MultiSelect";
import { useTableNavigation } from "@/hooks/useTableNavigation";
import { countriesMock } from "@/mock/countries";

const CountrySelectFilter = () => {
  const { searchParams, updateParams } = useTableNavigation();
  const selectedCountries = searchParams.getAll("country");

  const options = countriesMock.map((country) => ({
    value: country,
    label: country,
  }));

  const handleValueChange = (values: string[]) => {
    updateParams({ country: values, page: "1" });
  };

  return (
    <div>
      <MultiSelect
        options={options}
        defaultValue={selectedCountries}
        value={selectedCountries}
        onValueChange={handleValueChange}
        placeholder="País"
        className="shadow-none rounded-sm p-0 border border-gray-300 
                   data-[state=open]:border-green-600 data-[state=open]:border-2 focus:border-green-600"
      />
    </div>
  );
};

export default CountrySelectFilter;
