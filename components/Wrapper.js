import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { TopMenu } from "./TopMenu";

export const Wrapper = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Container maxW="container.xl">
      <VStack p="5">
        <Flex w="100%">
          <Heading
            ml="0"
            size="xl"
            fontWeight="semibold"
            color={useColorModeValue("black", "white")}
          >
            L I C E N C I A S
          </Heading>
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
      <Box>{children}</Box>
    </Container>
  );
};
