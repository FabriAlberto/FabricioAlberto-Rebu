"use client";
import React, { useEffect, useState } from "react";
import { useTableNavigation } from "@/hooks/useTableNavigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

const Search = () => {
  const { searchParams, handleSearch } = useTableNavigation();
  const currentQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(currentQuery);

  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== currentQuery) {
        handleSearch(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, currentQuery, handleSearch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="">
      <div className="relative w-full">
        <TextField.Root
          placeholder="Buscar"
          color="green"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="rounded-sm  data-[state=open]:border-sky-400 data-[state=open]:border-2"
          size={"3"}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </div>
  );
};

export default Search;
