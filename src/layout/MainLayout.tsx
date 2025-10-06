'use client';

import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { HEIGHT_NAVBAR } from "@/utils/constants";
import { ToastProvider } from "@/context/ToastProvider";
import { Container, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <section>
      {!isLoginPage && <Navbar />}
      <ToastProvider>
        <Flex direction="row" gap="4">
          <Container
            style={{
              marginTop: !isLoginPage ? `${HEIGHT_NAVBAR}px` : '0',
            }}
          >
            {children}
          </Container>
        </Flex>
      </ToastProvider>
    </section>
  );
};

export default MainLayout;
