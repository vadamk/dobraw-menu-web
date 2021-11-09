import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";

import Dish from "./Dish";

const DishDesktopModal = ({ dish, inCart, onClose, onCartToggle }) => {
  const [minHeight, setMinHeight] = React.useState(localStorage.getItem("minHeight") || 0);
  const [isSmallDevice] = useMediaQuery("(max-width: 768px)")

  React.useEffect(() => {
    const handleResize = () => {
      setMinHeight(val => {
        if (window.innerHeight > val) {
          localStorage.setItem("minHeight", window.innerHeight)
          return window.innerHeight
        }

        return val
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  return (
    <Modal size={isSmallDevice ? "full" : "lg"} isOpen={Boolean(dish)} onClose={onClose}>
      <ModalOverlay bg={isSmallDevice ? "white" : undefined} />
      <ModalContent
        m={0}
        borderRadius="0"
        containerProps={{ minH: minHeight + "px" }}
      >
        <ModalCloseButton zIndex={1} />
        <Dish
          isDetail
          dish={dish}
          inCart={inCart}
          onCartToggle={onCartToggle}
        />
      </ModalContent>
    </Modal>
  );
};

export default DishDesktopModal;
