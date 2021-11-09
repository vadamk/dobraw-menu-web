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
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";

import { getDishThumbnailURL } from '../utils'

const Dish = ({ dish, isDetail, isSelected, inCart, onOpen, onCartToggle }) => {
  return (
    <Stack pb={4} w="full">
      <AspectRatio
        ratio={1}
        cursor="pointer"
        onClick={onOpen}
        pointerEvents={isDetail ? "none" : "auto"}
      >
        <Image
          w="full"
          src={getDishThumbnailURL(dish)}
          alt={dish.title}
          userSelect="none"
        />
      </AspectRatio>
      <Box>
        <Stack
          spacing="1"
          direction="row"
          alignItems="flex-end"
          pt={2}
          px={isDetail && 6}
        >
          <Text fontSize="4xl" lineHeight="1">
            {dish.price}
          </Text>
          <Text fontSize="lg">добра</Text>
          <Spacer />
          <Button
            colorScheme={inCart ? "red" : "green"}
            leftIcon={inCart ? <MdOutlineRemoveShoppingCart /> : <MdOutlineShoppingCart />}
            onClick={onCartToggle}
          >
            {inCart ? "Убрать" : "В корзину"}
          </Button>
        </Stack>
        <Box
          cursor="pointer"
          px={isDetail && 6}
          pt={isDetail ? 6 : 4}
          onClick={onOpen}
        >
          <Heading size={isDetail ? "xl" : "md"}>
            {dish.name}
          </Heading>
        </Box>
        {isDetail &&
          <Stack pt={4} p={isDetail && 6} spacing="1" direction="column">
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
