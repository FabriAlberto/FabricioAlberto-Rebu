import React from 'react';
import UsersLayout from "@/components/layout/UsersLayout";
import FormSkeleton from '@/components/common/FormSkeleton';

export default function Loading() {
  return (
    <UsersLayout title="Cargando...">
      <FormSkeleton/>
    </UsersLayout>
  );
}
