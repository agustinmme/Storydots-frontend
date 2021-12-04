import React from "react";
import Link from "./ListLink";
import ListHeader from "./ListHeader";
import SocialButton from "./SocialButton";
import RippledButton from "../button/RippledButton";
import logo from "../../assets/storydots-footer.svg";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  return (
    <Box
      bg={"gray.50"}
      color={"gray.700"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Image src={logo} alt="Logo story" />
            <ListHeader
              textColor={"primary.500"}
              cursor={"pointer"}
              transition={"color 0.5s ease"}
              _hover={{
                color: "black",
              }}
              fontSize={"sm"}
            >
              hola@storydots.app
            </ListHeader>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader textColor={"primary.500"}>
              Ejemplos de Producto
            </ListHeader>
            <Link color={"gray"} href={"#"}>
              Demo interactiva
            </Link>
            <Link color={"gray"} href={"#"}>
              Safety Center
            </Link>
            <Link color={"gray"} href={"#"}>
              Community Guidelines
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader textColor={"primary.500"}>Compatibilidad</ListHeader>
            <Link color={"gray"} href={"#"}>
              Tiendanube
            </Link>
            <Link color={"gray"} href={"#"}>
              Shopify
            </Link>
            <Link color={"gray"} href={"#"}>
              API
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader textColor={"primary.500"}>Recursos</ListHeader>
            <Link color={"gray"} href={"#"}>
              Regalalo
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader textColor={"primary.500"}>Compañía</ListHeader>
            <Link color={"gray"} href={"#"}>
              Trabajá con nosotros
            </Link>
            <Link color={"gray"} href={"#"}>
              Términos y privacidad
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box>
        <Container
          borderTopWidth={2}
          borderStyle={"solid"}
          borderColor={"primary.300"}
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text fontWeight={"100"} fontSize={"14px"}>
            © 2021 Storydots
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={6}>
            <RippledButton
              scheme="gray"
              step1={"100"}
              step2={"200"}
              step3={"300"}
              textColor={"gray.500"}
              size={"sm"}
            >
              SUPPORT DESK
            </RippledButton>
            <RippledButton
              scheme="gray"
              textColor={"gray.500"}
              step1={"100"}
              step2={"200"}
              step3={"300"}
              size={"sm"}
            >
              BOOK A DEMO
            </RippledButton>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Linkedin"}
                href={"https://www.linkedin.com/company/storydots/"}
              >
                <FaLinkedin />
              </SocialButton>
              <SocialButton
                label={"Instagram"}
                href={"https://www.instagram.com/storydotsapp/"}
              >
                <FaInstagram />
              </SocialButton>
              <SocialButton label={"Email"} href={"mailto:hola@storydots.app"}>
                <HiMail />
              </SocialButton>
              <SocialButton
                label={"Facebook"}
                href={"https://www.facebook.com/storydotsapp"}
              >
                <FaFacebook />
              </SocialButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
