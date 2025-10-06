import React from "react";
import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import LogoutButton from "./LogoutButton";
import { AUTH_CREDENTIALS } from "@/utils/auth";

export default function UserInfo() {
  // En un caso real, obtendrías esta info del contexto o estado global
  const userEmail = AUTH_CREDENTIALS.email;
  const userName = userEmail.split("@")[0]; // admin

  return (
    <Flex align="center" gap="4">
      <Flex align="center" gap="3">
        <Avatar
          size="2"
          radius="full"
          fallback={userName.charAt(0).toUpperCase()}
          color="blue"
        />
        <Box>
          <Text size="2" weight="medium">
            {userName}
          </Text>
          <Text size="1" color="gray">
            {userEmail}
          </Text>
        </Box>
      </Flex>
      <LogoutButton />
    </Flex>
  );
}
