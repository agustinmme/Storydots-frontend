import React from "react";
import { Button } from "@chakra-ui/react";

export default function RippledButton({
  children,
  scheme,
  step1,
  step2,
  step3,
  ...rest
}) 

{
  return (
    <Button
      bgColor={`${scheme}.${step1}`}
      color="white"
      fontWeight="medium"
      p={4}
      rounded="md"
      {...rest}
      _focus={{
        outline: "none",
      }}
      transition="background 0.8s"
      backgroundPosition="center"
      _hover={{
        bgColor: `${scheme}.${step2}`,
        bgGradient: `radial(circle, transparent 1%, ${scheme}.${step2} 1%)`,
        bgPos: "center",
        backgroundSize: "15000%",
      }}
      _active={{
        bgColor: `${scheme}.${step3}`,
        backgroundSize: "100%",
        transition: "background 0s",
      }}
    >
      {children}
    </Button>
  );
}
