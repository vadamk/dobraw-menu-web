import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import useMinHeight from "../hooks/useMinHeight";
import Dish from "./Dish";

const DishDesktopModal = ({ dish, inCart, onClose, onCartToggle }) => {
  const [isSmallDevice] = useMediaQuery("(max-width: 448px)")
  const [minHeight] = useMinHeight()
  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  React.useEffect(() => {
    if (y > 100) {
      onClose()
    }
  }, [onClose, y])

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, last, movement: [mx, my] }) => {
    if (my > 180 && last) onClose()
    api.start({ y: down ? my : 0, immediate: down })
  })

  return (
    <Modal size={isSmallDevice ? "full" : "lg"} isOpen={Boolean(dish)} onClose={onClose}>
      <ModalOverlay bg={isSmallDevice ? "white" : undefined} />
      <ModalContent
        m={0}
        {...bind()}
        style={{ y }}
        as={animated.div}
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
