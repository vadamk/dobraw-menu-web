import React from "react";
import { IconButton } from "@chakra-ui/button";
import Icon from '@chakra-ui/icon';

import { FiShoppingBag } from "react-icons/fi";
import { Box } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';

const CartButton = ({ count, onClick }) => {
  return (
    <Box
      position="fixed"
      bottom="8"
      right="8"
    >
      <IconButton
        w="64px"
        h="64px"
        rounded="full"
        colorScheme="orange"
        icon={<Icon fontSize="2xl" as={FiShoppingBag} />}
        onClick={onClick}
      />
      {count > 0 && (
        <Tag position="absolute" top="-2" right="-1" bg="green" variant="solid">
          {count}
        </Tag>
      )}
    </Box>
  );
};

export default CartButton;
