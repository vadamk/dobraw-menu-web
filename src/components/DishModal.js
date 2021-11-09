import React from "react";
import { motion } from 'framer-motion';
import { Box, Container, useColorMode, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import Dish from "./Dish";

const DishModal = ({ dish, inCart, onClose, onCartToggle }) => {
  const theme = useColorMode()

  const bg = theme.colorMode === "dark" ? "gray.600" : "white"

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      overflow="auto"
      className="static-scrollbar"
    >
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        onClick={onClose}
      />
      <Container
        padding="0"
        zIndex="1"
      >
        <IconButton
          position="absolute"
          top="10px"
          right="10px"
          zIndex={1}
          icon={<CloseIcon />}
          onClick={onClose}
        />
        <Box
          as={motion.div}
          layoutId={dish?.id}
          bg={bg}
        >
          <Dish isMobile isDetail dish={dish} inCart={inCart} onCartToggle={onCartToggle} />
        </Box>
      </Container>
    </Box>
  );
}

export default DishModal;
