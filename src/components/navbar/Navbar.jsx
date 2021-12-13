import React from "react";
import RippledButton from "../button/RippledButton";
import logo from "../../assets/storydots.svg";
import RegisterModal from "../modals/RegisterModal";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Image,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteTokenLocal } from "../../../utils/auth";

export default function Navbar({ login = false }) {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  const logout = ()=>{
    deleteTokenLocal();
    navigate("/");
  }
  return (
    <React.Fragment>
      <chakra.header
        bgGradient={"linear(to-r, primary.200, secondary.600)"}
        w={"full"}
        px={{ base: 4, sm: 14 }}
        pt={10}
        pb={6}
        shadow="md"
        borderBottom="1px white solid "
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="StoryDots"
              display="flex"
              alignItems="center"
            >
              <Image src={logo} alt="Logo story" />
            </chakra.a>
            <chakra.h1
              fontSize="xl"
              fontWeight="medium"
              textColor={"secondary.50"}
              ml="2"
              mt={1}
            >
              SHOP
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={5}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <RippledButton bgColor={"transparent"} onClick={()=>{navigate("/")}}>HOME</RippledButton>
              {login ?null:<RippledButton
                rightIcon={<IoMdArrowRoundForward />}
                border={"1px solid"}
                scheme={"secondary"}
                shadow={"base"}
                step1={"600"}
                step2={"700"}
                step3={"800"}
                size={"md"}
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                DASHBOARD
              </RippledButton>}
              {login ? (
                <RippledButton
                scheme={"gray"}
                shadow={"base"}
                textColor="primary.600"
                step1={"50"}
                step2={"200"}
                step3={"300"}
                size={"md"}
                onClick={logout}
                >
                  SALIR
                </RippledButton>
              ) : (
                <RegisterModal />
              )}
            </HStack>

            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={"white"}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                bgGradient={"linear(to-r, primary.200, secondary.600)"}
                spacing={3}
                rounded="sm"
                shadow="sm"
                zIndex={"1"}
              >
                <CloseButton
                  aria-label="Close menu"
                  color={"white"}
                  onClick={mobileNav.onClose}
                />

                <RippledButton
                  bgColor={"transparent"}
                  onClick={() => {
                    navigate("/");
                  }}
                  w={"full"}
                >
                  HOME
                </RippledButton>

                <RippledButton
                  bgColor={"transparent"}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  w={"full"}
                >
                  DASHBOARD
                </RippledButton>

                {login ? (
                  <RippledButton
                  scheme={"gray"}
                  shadow={"base"}
                  textColor="primary.600"
                  step1={"50"}
                  step2={"200"}
                  step3={"300"}
                  size={"md"}
                  onClick={logout}
                  >
                    SALIR
                  </RippledButton>
                ) : (
                  <RegisterModal />
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
