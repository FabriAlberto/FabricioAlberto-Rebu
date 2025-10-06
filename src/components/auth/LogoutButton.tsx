'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { clearAuthCookieClient } from '@/utils/auth';
import { Button, Text } from '@radix-ui/themes';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthCookieClient();
    router.push('/login');
  };

  return (
    <Button 
      variant="soft" 
      color="red" 
      size="2"
      onClick={handleLogout}
      className='cursor-pointer rounded-md'
    >
      <Text size="2">Cerrar sesión</Text>
    </Button>
  );
}
