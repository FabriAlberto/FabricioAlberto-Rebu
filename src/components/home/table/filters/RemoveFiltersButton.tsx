"use client";
import { useTableNavigation } from "@/hooks/useTableNavigation";
import { TrashIcon } from "@radix-ui/react-icons";
import {IconButton } from "@radix-ui/themes";
import React from "react";

const RemoveFiltersButton = () => {
  const { searchParams, removeFilters } = useTableNavigation();
  const query = searchParams.get("query");
  const status = searchParams.get("status");
  const sector = searchParams.get("sector");
  const country = searchParams.get("country");
  if (!query && !status && !sector && !country) return null;
  return (
    <IconButton
      onClick={removeFilters}
      variant="soft"
      color="crimson"
      title="Limpiar filtros"
    >
      <TrashIcon color="red" />
    </IconButton>
  );
};

export default RemoveFiltersButton;
