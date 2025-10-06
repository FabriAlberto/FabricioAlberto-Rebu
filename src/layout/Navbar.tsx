import React from "react";
import Image from "next/image";
import { HEIGHT_NAVBAR } from "@/utils/constants";
import { Flex } from "@radix-ui/themes";

const Navbar = () => {
  return (
    <Flex
      width="100%"
      px="8"
      position="fixed"
      top="0"
      left="0"
      align="center"
      style={{
        height: `${HEIGHT_NAVBAR}px`,
      }}
      className="shadow-md "
    >
      <Image src={"/rebuIcon.svg"} alt="dux icon" width={100} height={25} />
    </Flex>
  );
};

export default Navbar;
