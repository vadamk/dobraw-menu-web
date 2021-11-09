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
  const [selectedDishId, setSelectedDishId] = React.useState(null);
  const [cartDishIds, setCartDishIds] = React.useState([]);
  const [selectedTagIds, setSelectedTagIds] = React.useState([]);
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

  const handleClean = React.useCallback(
    dish => {
      setCartDishIds([]);
      cartModal.onClose();
    },
    [cartModal]
  );

  const handleCartToggle = React.useCallback(
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

  const handleSelect = React.useCallback(
    dish => () => {
      setSelectedDishId(val => (val ? null : dish.id));
    },
    []
  );

  const handleSelectTag = React.useCallback(
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

  const handleClose = React.useCallback(() => {
    setSelectedDishId(null);
  }, []);

  const isSelected = React.useCallback(
    dish => {
      return cartDishIds.includes(dish.id);
    },
    [cartDishIds]
  );

  const handleClearFilter = React.useCallback(() => {
    setSelectedTagIds([]);
  }, []);

  return (
    <Container p={4} maxW="container.xl">
      <Filter
        tags={dataTags}
        selectedTagIds={selectedTagIds}
        onSelect={handleSelectTag}
        onClear={handleClearFilter}
      />
      <Center>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {data.map(dish =>
            <WrapItem key={dish.id} maxW="sm">
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
      {selectedDish &&
        <DishDesktopModal
          dish={selectedDish}
          inCart={isSelected(selectedDish)}
          onClose={handleClose}
          onCartToggle={handleCartToggle(selectedDish)}
        />}
      <Cart
        dishes={cartDishes}
        onRemove={handleCartToggle}
        onClean={handleClean}
        {...cartModal}
      />
      <CartButton count={cartDishes.length} onClick={cartModal.onOpen} />
    </Container>
  );
}

export default App;
