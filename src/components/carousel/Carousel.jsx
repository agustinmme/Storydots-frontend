import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

export default function Carousel() {
  const slides = [
    {
      img: "https://regalalo.ar/static/media/Slide%201.d172b924.png",
    },
    {
      img: "https://regalalo.ar/static/media/Slide%202.c15354fa.png",
    },
    {
      img: "https://regalalo.ar/static/media/Slide%203.65000da9.png",
    },
    {
      img: "https://regalalo.ar/static/media/Slide%204.4df8529b.png",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, []);

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
     

    >
      <Flex w="full" overflow="hidden">
        <Flex
          pos="relative"
          h={{ base: "200px", md: "500px" }}
          w="full"
          zIndex={"0"}
          {...carouselStyle}
        >
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Image  src={slide.img} h={{ base: "200px", md: "500px" }}  w={"full"}  objectFit='cover' objectPosition={{base:"20%",md:"none"}} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
