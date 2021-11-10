import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";

import useMinHeight from "../hooks/useMinHeight";
import Dish from "./Dish";

const DishDesktopModal = ({ dish, inCart, onClose, onCartToggle }) => {
  const [isSmallDevice] = useMediaQuery("(max-width: 448px)")
  const [minHeight] = useMinHeight()
  return (
    <Modal size={isSmallDevice ? "full" : "lg"} isOpen={Boolean(dish)} onClose={onClose}>
      <ModalOverlay
        bg={isSmallDevice ? "white" : undefined}
      />
      <ModalContent
        m={0}
        borderRadius="0"
        containerProps={{ minH: minHeight + "px" }}
        className="static-scrollbar"
      >
        <ModalCloseButton zIndex={1} color="white" />
        <Dish
          isDetail
          dish={dish}
          inCart={inCart}
          onOpen={onClose}
          onCartToggle={onCartToggle}
        />
      </ModalContent>
    </Modal>
  );
};

export default DishDesktopModal;
