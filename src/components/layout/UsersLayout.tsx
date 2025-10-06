import {  Heading } from "@radix-ui/themes";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  actionChildren?: React.ReactNode;
};

const UsersLayout = ({
  children,
  actionChildren,
  title = "Usuarios",
}: Props) => {
  return (
    <section className="mt-5 w-full">
      <div className="flex justify-between">
        <Heading as="h1">{title}</Heading>
        {actionChildren}
      </div>
      {children}
    </section>
  );
};

export default UsersLayout;
