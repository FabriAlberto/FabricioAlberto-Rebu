"use client";

import { useEffect } from "react";
import {
  Button,
  Card,
  Flex,
  Text,
  Heading,
  Badge,
  Separator,
} from "@radix-ui/themes";
import {
  ExclamationTriangleIcon,
  ReloadIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Registrar el error global en un servicio de monitoreo
    console.error("Error global capturado:", error);
  }, [error]);

  return (
    <html>
      <body>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="min-h-screen bg-gray-50 p-4"
        >
          <Card size="4" className="max-w-md w-full">
            <Flex direction="column" align="center" gap="4" p="6">
              <Flex
                align="center"
                justify="center"
                className="w-16 h-16 bg-red-100 rounded-full"
              >
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
              </Flex>

              <Heading size="6" align="center" className="text-gray-900">
                Error Crítico del Sistema
              </Heading>

              <Text size="3" align="center" className="text-gray-600">
                Ha ocurrido un error crítico que afecta toda la aplicación. Por
                favor, recarga la página completamente.
              </Text>

              <Badge color="red" variant="soft" size="2">
                Error Global
              </Badge>

              <Separator className="w-full" />

              <Flex gap="3" className="w-full">
                <Button onClick={reset} className="flex-1" size="3">
                  <ReloadIcon className="w-4 h-4 mr-2" />
                  Recargar aplicación
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="soft"
                  color="gray"
                  className="flex-1"
                  size="3"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Ir al inicio
                </Button>
              </Flex>

             
                <Card variant="surface" className="w-full mt-4">
                  <Flex direction="column" gap="2" p="3">
                    <Text size="2" weight="bold" color="red">
                      Detalles del error global (desarrollo)
                    </Text>
                    <Separator />
                    <Text
                      size="1"
                      className="font-mono bg-gray-100 p-2 rounded overflow-auto max-h-32"
                    >
                      {error.message}
                    </Text>
                    {error.digest && (
                      <Text size="1" className="font-mono text-gray-500">
                        Digest: {error.digest}
                      </Text>
                    )}
                  </Flex>
                </Card>
            </Flex>
          </Card>
        </Flex>
      </body>
    </html>
  );
}
