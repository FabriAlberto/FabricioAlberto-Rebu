import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Flex, Text, Heading } from '@radix-ui/themes';

export default function LoginPage() {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <Flex direction="column" align="center" gap="6" className="w-full max-w-md">
        <Flex direction="column" align="center" gap="2">
          <Heading size="8" weight="bold">
            Iniciar Sesión
          </Heading>
          <Text size="3" color="gray">
            Accede a tu cuenta de Rebuhr
          </Text>
        </Flex>
        <LoginForm />
      </Flex>
    </Flex>
  );
}
