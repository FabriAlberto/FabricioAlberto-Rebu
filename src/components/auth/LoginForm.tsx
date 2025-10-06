'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_CREDENTIALS, setAuthCookieClient } from '@/utils/auth';
import { 
  Card, 
  TextField, 
  Button, 
  Text, 
  Flex, 
  Box, 
  Callout,
  Badge
} from '@radix-ui/themes';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === AUTH_CREDENTIALS.email && password === AUTH_CREDENTIALS.password) {
      setAuthCookieClient();
      router.push('/employees');
    } else {
      setError('Credenciales incorrectas');
    }
    
    setIsLoading(false);
  };

  return (
    <Card size="4" className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Email
            </Text>
            <TextField.Root
              type="email"
              placeholder="admin@rebuhr.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="3"
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Contraseña
            </Text>
            <TextField.Root
              type="password"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="3"
            />
          </Flex>

          {error && (
            <Callout.Root color="red" variant="soft">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Button 
            type="submit" 
            size="3" 
            color='green'
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <Box className="text-center">
            <Text size="2" color="gray">
              Credenciales de prueba:
            </Text>
            <Flex direction="column" gap="1" mt="2">
              <Badge color="blue" variant="soft" size="2">
                {AUTH_CREDENTIALS.email}
              </Badge>
              <Badge color="green" variant="soft" size="2">
                {AUTH_CREDENTIALS.password}
              </Badge>
            </Flex>
          </Box>
        </Flex>
      </form>
    </Card>
  );
}
