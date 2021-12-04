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
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <chakra.header
        bgGradient={"linear(to-r, primary.200, secondary.600)"}
        w="full"
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
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <RippledButton
                bgColor={"transparent"}
              >
                HOME
              </RippledButton>
              <RippledButton
                rightIcon={<IoMdArrowRoundForward />}
                border={"1px solid"}
                scheme={"secondary"}
                shadow={"base"}
                step1={"600"}
                step2={"700"}
                step3={"800"}
                size={"md"}
                onClick={()=>{navigate('/dashboard')}}
              >
                DASHBOARD
              </RippledButton>
              <RegisterModal/>
            </HStack>

            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
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
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
