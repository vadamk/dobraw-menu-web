import React from "react";
import { Center, Container, SimpleGrid, WrapItem } from "@chakra-ui/layout";

import Dish from "./components/Dish";
import CartButton from "./components/CartButton";
import { data, dataTags } from "./data";
import Cart from "./components/Cart";
import DishDesktopModal from "./components/DishDesktopModal";
import { useDisclosure } from "@chakra-ui/hooks";
import Filter from "./components/Filter";

function App() {
  const [selectedDish, setSelectedDish] = React.useState(null);
  const [cartDishIds, setCartDishIds] = React.useState([]);
  const [selectedTagIds, setSelectedTagIds] = React.useState([]);
  const cartModal = useDisclosure();

  const cartDishes = React.useMemo(
    () => {
      return data.filter(d => cartDishIds.includes(d.id));
    },
    [cartDishIds]
  );

  const cleanCart = React.useCallback(
    dish => {
      setCartDishIds([]);
      cartModal.onClose();
    },
    [cartModal]
  );

  const toggleCart = React.useCallback(
    dish => () => {
      setCartDishIds(
        val =>
          !val.includes(dish.id)
            ? [...val, dish.id]
            : val.filter(id => id !== dish.id)
      );
    },
    []
  );

  const openDetail = React.useCallback(
    dish => () => {
      setSelectedDish(val => (val ? null : dish));
    },
    []
  );

  const selectFilterTag = React.useCallback(
    tag => () => {
      setSelectedTagIds(
        val =>
          !val.includes(tag.id)
            ? [...val, tag.id]
            : val.filter(id => id !== tag.id)
      );
    },
    []
  );

  const detailClose = React.useCallback(() => {
    setSelectedDish(null);
  }, []);

  const isInCart = React.useCallback(
    dish => {
      return cartDishIds.includes(dish.id);
    },
    [cartDishIds]
  );

  const clearFilter = React.useCallback(() => {
    setSelectedTagIds([]);
  }, []);

  return (
    <Container p={4} maxW="container.xl">
      <Filter
        tags={dataTags}
        selectedTagIds={selectedTagIds}
        onSelect={selectFilterTag}
        onClear={clearFilter}
      />
      <Center>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {data.map(dish =>
            <WrapItem key={dish.id}>
              <Dish
                dish={dish}
                inCart={isInCart(dish)}
                onOpen={openDetail(dish)}
                onCartToggle={toggleCart(dish)}
              />
            </WrapItem>
          )}
        </SimpleGrid>
      </Center>
      {selectedDish &&
        <DishDesktopModal
          dish={selectedDish}
          inCart={isInCart(selectedDish)}
          onClose={detailClose}
          onCartToggle={toggleCart(selectedDish)}
        />}
      <Cart
        dishes={cartDishes}
        onRemove={toggleCart}
        onClean={cleanCart}
        {...cartModal}
      />
      <CartButton count={cartDishes.length} onClick={cartModal.onOpen} />
    </Container>
  );
}

export default App;
