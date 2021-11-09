import React from "react";
import { Image } from "@chakra-ui/image";
import {
  AspectRatio,
  Box,
  Heading,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";

const Dish = ({ dish, isMobile, isDetail, isSelected, inCart, onOpen, onCartToggle }) => {
  return (
    <Stack
      pb={4}
      w="full"
      as={isMobile ? motion.div : undefined}
      layoutId={`body-${dish.id}`}
    >
      <AspectRatio
        ratio={1}
        p={isDetail && 4}
        cursor="pointer"
        as={isMobile ? motion.div : undefined}
        layoutId={`aspectRatio-${dish.id}`}
        onClick={onOpen}
        pointerEvents={isDetail ? "none" : "auto"}
      >
        <Image
          w="full"
          as={isMobile ? motion.img : undefined}
          layoutId={`img-${dish.id}`}
          src={dish.imageUrl}
          alt={dish.title}
          userSelect="none"
        />
      </AspectRatio>
      <Box
        as={isMobile ? motion.div : undefined}
        layoutId={`price-container-${dish.id}`}
      >
        <Stack spacing="1" direction="row" alignItems="flex-end" pt1={2} px={isDetail ? 4 : 0}>
          <Text fontSize="4xl" lineHeight="1">
            {dish.price}
          </Text>
          <Text fontSize="lg">добра</Text>
          <Spacer />
          {!inCart &&
            <Button colorScheme="green" onClick={onCartToggle}>
              В корзину
            </Button>}
          {inCart &&
            <Button colorScheme="red" onClick={onCartToggle}>
              Убрать
            </Button>}
        </Stack>
        <Box
          pt={4}
          as={isMobile ? motion.div : undefined}
          layoutId={`title-${dish.id}`}
          cursor="pointer"
          p={isDetail && 4}
          onClick={onOpen}
        >
          <Heading size="md">
            {dish.title}
          </Heading>
        </Box>
        {isDetail &&
          <Stack
            as={isMobile ? motion.div : undefined}
            pt={4}
            p={isDetail && 4}
            spacing="1"
            direction="column"
          >
            <Text fontSize="lg">
              После вкусного обеда 🍜 ждём Вас на ✨ Будда Баре ✨ на чашечку кофе
              или чая 🫖, и конечно же, мы хотим Вас угостить нашими
              великолепными десертами!🍪 🍰 🍨 Для Вас есть: Взрывная
              ШоколаднаяБомба!!!🖤 🍫☄️ идеально с Американо☕️ И ещё одна
              СуперНовинка — Карамельно-банановая Тарталетка🍌 🍯 кто не успел
              попробовать на фуршете – не упустите этот шанс сейчас😉 И много
              чего ещё вкусного и полезного✨
            </Text>
            <Text fontSize="lg">
              После вкусного обеда 🍜 ждём Вас на ✨ Будда Баре ✨ на чашечку кофе
              или чая 🫖, и конечно же, мы хотим Вас угостить нашими
              великолепными десертами!🍪 🍰 🍨 Для Вас есть: Взрывная
              ШоколаднаяБомба!!!🖤 🍫☄️ идеально с Американо☕️ И ещё одна
              СуперНовинка — Карамельно-банановая Тарталетка🍌 🍯 кто не успел
              попробовать на фуршете – не упустите этот шанс сейчас😉 И много
              чего ещё вкусного и полезного✨
            </Text>
            <Text fontSize="lg">
              После вкусного обеда 🍜 ждём Вас на ✨ Будда Баре ✨ на чашечку кофе
              или чая 🫖, и конечно же, мы хотим Вас угостить нашими
              великолепными десертами!🍪 🍰 🍨 Для Вас есть: Взрывная
              ШоколаднаяБомба!!!🖤 🍫☄️ идеально с Американо☕️ И ещё одна
              СуперНовинка — Карамельно-банановая Тарталетка🍌 🍯 кто не успел
              попробовать на фуршете – не упустите этот шанс сейчас😉 И много
              чего ещё вкусного и полезного✨
            </Text>
          </Stack>}
      </Box>
    </Stack>
  );
};

export default Dish;
