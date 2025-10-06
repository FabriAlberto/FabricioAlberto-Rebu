import React from "react";
import Image from "next/image";
import { HEIGHT_NAVBAR } from "@/utils/constants";
import { Flex, Box } from "@radix-ui/themes";
import UserInfo from "../components/auth/UserInfo";

const Navbar = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${HEIGHT_NAVBAR}px`,
        zIndex: 50,
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      <Flex
        width="100%"
        height="100%"
        px="8"
        align="center"
        justify="between"
      >
        <Image src={"/rebuIcon.svg"} alt="dux icon" width={100} height={25} />
        <UserInfo />
      </Flex>
    </Box>
  );
};

export default Navbar;
