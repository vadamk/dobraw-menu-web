import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"

import Dish from "./Dish";

const DishDesktopModal = ({ dish, inCart, onClose, onCartToggle }) => {
  return (
    <Modal size="2xl" isOpen={Boolean(dish)} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={1} />
        <Dish isDetail dish={dish} inCart={inCart} onCartToggle={onCartToggle} />
      </ModalContent>
    </Modal>
  );
}

export default DishDesktopModal;
