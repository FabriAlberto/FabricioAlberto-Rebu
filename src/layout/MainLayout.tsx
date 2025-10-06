import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { HEIGHT_NAVBAR } from "@/utils/constants";
import { ToastProvider } from "@/context/ToastProvider";
import { Container, Flex } from "@radix-ui/themes";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <ToastProvider>
        <Flex direction="row" gap="4">
          <Container
            style={{
              marginTop: `${HEIGHT_NAVBAR}px`,
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
