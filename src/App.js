import React from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Center, Container, SimpleGrid, WrapItem } from "@chakra-ui/layout";

import Dish from "./components/Dish";
import CartButton from "./components/CartButton";
import DishModal from "./components/DishModal";
import { data } from "./data";
import Cart from "./components/Cart";
import DishDesktopModal from "./components/DishDesktopModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMediaQuery } from "@chakra-ui/react"
function App() {
  const [selectedDishId, setSelectedDishId] = React.useState(null);
  const [cartDishIds, setCartDishIds] = React.useState([]);

  const [isLargerThan560] = useMediaQuery("(min-width: 560px)")

  const cartModal = useDisclosure();

  const selectedDish = React.useMemo(
    () => data.find(d => d.id === selectedDishId),
    [selectedDishId]
  );

  const cartDishes = React.useMemo(
    () => {
      return data.filter(d => cartDishIds.includes(d.id));
    },
    [cartDishIds]
  );

  const handleClean = React.useCallback(dish => {
    setCartDishIds([]);
    cartModal.onClose()
  }, [cartModal]);

  const handleCartToggle = React.useCallback(dish => () => {
    setCartDishIds(
      val =>
        !val.includes(dish.id)
          ? [...val, dish.id]
          : val.filter(id => id !== dish.id)
    );
  }, []);

  const handleSelect = React.useCallback(
    dish => () => {
      setSelectedDishId(val => (val ? null : dish.id));
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setSelectedDishId(null);
  }, []);

  const isSelected = React.useCallback(
    dish => {
      return cartDishIds.includes(dish.id);
    },
    [cartDishIds]
  );
  return (
    <AnimateSharedLayout type="crossfade">
      <Container p={4} maxW="container.xl">
        <Center>
          <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
            {data.map(dish =>
              <WrapItem
                key={dish.id}
                maxW="sm"
                as={motion.div}
                layoutId={dish.id}
              >
                <Dish
                  dish={dish}
                  inCart={isSelected(dish)}
                  onOpen={handleSelect(dish)}
                  onCartToggle={handleCartToggle(dish)}
                />
              </WrapItem>
            )}
          </SimpleGrid>
        </Center>
        {!isLargerThan560 && (
          <AnimatePresence>
            {selectedDish &&
              <DishModal
                dish={selectedDish}
                inCart={isSelected(selectedDish)}
                onClose={handleClose}
                onCartToggle={handleCartToggle(selectedDish)}
              />}
          </AnimatePresence>
        )}
        {selectedDish && isLargerThan560 && (
          <DishDesktopModal
            dish={selectedDish}
            inCart={isSelected(selectedDish)}
            onClose={handleClose}
            onCartToggle={handleCartToggle(selectedDish)}
          />
        )}
        <Cart
          dishes={cartDishes}
          onRemove={handleCartToggle}
          onClean={handleClean}
          {...cartModal}
        />
        <CartButton count={cartDishes.length} onClick={cartModal.onOpen} />
      </Container>
    </AnimateSharedLayout>
  );
}

export default App;
