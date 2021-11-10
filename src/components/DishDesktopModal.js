import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSpring, animated, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import useMinHeight from "../hooks/useMinHeight";
import Dish from "./Dish";

const CLOSE_THRESHOLD = 200
const SPRING_HARDNESS = 0.5

const DishDesktopModal = ({ dish, inCart, onClose, onCartToggle }) => {
  const [isSmallDevice] = useMediaQuery("(max-width: 448px)")
  const [minHeight] = useMinHeight()
  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, last, movement: [mx, my] }) => {
    let nextY = 0
    const hardness = Math.max(0.5, Math.abs((CLOSE_THRESHOLD - my) / CLOSE_THRESHOLD)) * SPRING_HARDNESS

    if (down) {
      nextY = my * hardness
    } else if (last) {
      if (my > CLOSE_THRESHOLD) {
        nextY = Number(minHeight)
        setTimeout(onClose, 300)
      }
    }

    api.start({ y: nextY, immediate: down, config: config.stiff })
  })

  const bgStyle = {
    opacity: y.to([0, CLOSE_THRESHOLD * 2], [1, 0], "clamp")
  }

  return (
    <Modal size={isSmallDevice ? "full" : "lg"} isOpen={Boolean(dish)} onClose={onClose}>
      <ModalOverlay
        as={animated.div}
        bg={isSmallDevice ? "white" : undefined}
        style={bgStyle}
      />
      <ModalContent
        m={0}
        {...bind()}
        touchActions={"none"}
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
