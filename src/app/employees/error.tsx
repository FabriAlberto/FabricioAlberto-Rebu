'use client';

import { useEffect } from 'react';
import { Button, Card, Flex, Text, Heading, Badge, Separator } from '@radix-ui/themes';
import { ExclamationTriangleIcon, ReloadIcon, ArrowLeftIcon } from '@radix-ui/react-icons';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EmployeesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Registrar el error específico de empleados
    console.error('Error en sección de empleados:', error);
  }, [error]);

  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      className="min-h-[400px] bg-gray-50 p-4"
    >
      <Card size="3" className="max-w-md w-full">
        <Flex direction="column" align="center" gap="3" p="4">
          {/* Icono de error */}
          <Flex 
            align="center" 
            justify="center" 
            className="w-12 h-12 bg-red-100 rounded-full"
          >
            <ExclamationTriangleIcon 
              className="w-6 h-6 text-red-600" 
            />
          </Flex>

          {/* Título */}
          <Heading size="5" align="center" className="text-gray-900">
            Error en Gestión de Empleados
          </Heading>

          {/* Descripción */}
          <Text 
            size="2" 
            align="center" 
            className="text-gray-600"
          >
            No se pudo cargar la información de empleados. 
            Intenta recargar esta sección.
          </Text>

          {/* Badge de estado */}
          <Badge color="red" variant="soft" size="1">
            Error de Datos
          </Badge>

          <Separator className="w-full" />

          {/* Botones de acción */}
          <Flex gap="2" className="w-full">
            <Button
              onClick={reset}
              className="flex-1"
              size="2"
            >
              <ReloadIcon className="w-3 h-3 mr-1" />
              Recargar
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="soft"
              color="gray"
              className="flex-1"
              size="2"
            >
              <ArrowLeftIcon className="w-3 h-3 mr-1" />
              Volver
            </Button>
          </Flex>

          {/* Detalles del error en desarrollo */}
          {process.env.NODE_ENV === 'development' && (
            <Card variant="surface" className="w-full mt-3">
              <Flex direction="column" gap="1" p="2">
                <Text size="1" weight="bold" color="red">
                  Error (desarrollo)
                </Text>
                <Text size="1" className="font-mono bg-gray-100 p-1 rounded overflow-auto max-h-20">
                  {error.message}
                </Text>
              </Flex>
            </Card>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
