'use client'
import { MultiSelect } from '@/components/common/MultiSelect';
import { useTableNavigation } from '@/hooks/useTableNavigation';
import { sectors } from '@/mock/sector';
import React from 'react'

const SectorSelectFilter = () => {
  const { searchParams, updateParams } = useTableNavigation();
  const selectedSector = searchParams.getAll("sector");
  
  const options = sectors.map((sector) => ({
    value: sector,
    label: sector,
  }));

  const handleValueChange = (values: string[]) => {
    updateParams({ sector: values, page: "1" });
  };

  return (
    <div>
      <MultiSelect
        options={options}
        defaultValue={selectedSector}
        value={selectedSector}
        onValueChange={handleValueChange}
        color='primary'
        placeholder="Sector"
        className="shadow-none rounded-sm p-0 border border-gray-300 
                   data-[state=open]:border-green-600 data-[state=open]:border-2 focus:border-green-600"
      />
    </div>
  );
}

export default SectorSelectFilter