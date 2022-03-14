import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { TopMenu } from "./TopMenu";

export const Wrapper = ({ children }) => {
  const { data: session, status } = useSession();
  console.log(status);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Container maxW="container.xl">
      {status === "authenticated" && (
        <VStack p="5">
          <Flex w="100%">
            <Heading ml="0" size="xl" fontWeight="semibold">
              <Image src="/images/logo.jpg" width="60" height="60" alt="RL" />
            </Heading>
            {session?.user?.email && (
              <>
                <Spacer />
                <span> {session.user.email} </span>
                <Spacer />
                <Button onClick={() => signOut()} size="xs">
                  Cerrar sesión
                </Button>
              </>
            )}
            <Spacer />
            <TopMenu />
            <IconButton
              ml={8}
              icon={isDark ? <FaSun /> : <FaMoon />}
              isRound="true"
              onClick={toggleColorMode}
            />
          </Flex>
        </VStack>
      )}

      <Box>{children}</Box>
    </Container>
  );
};
