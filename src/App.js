import React from "react";
import { Center, Container, SimpleGrid, WrapItem } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/react";

import Dish from "./components/Dish";
import CartButton from "./components/CartButton";
import Cart from "./components/Cart";
import DishDesktopModal from "./components/DishDesktopModal";
import Filter from "./components/Filter";

import useDishes from "./hooks/useDishes";
import Pagination from "./components/Pagination";

function App() {
  const [selectedDish, setSelectedDish] = React.useState(null);
  const [cartDishes, setCartDishes] = React.useState([]);
  const [selectedTagIds, setSelectedTagIds] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const cartModal = useDisclosure();

  const dishes = useDishes({
    start: currentPage * 5,
    limit: 5,
    tagIds: selectedTagIds
  });

  const cleanCart = React.useCallback(dish => setCartDishes([]), []);

  const toggleCart = React.useCallback(
    dish => () => {
      setCartDishes(
        val =>
          !val.map(d => d.id).includes(dish.id)
            ? [...val, dish]
            : val.filter(d => d.id !== dish.id)
      );
    },
    []
  );

  const openDetail = React.useCallback(
    dish => () => setSelectedDish(val => (val ? null : dish)),
    []
  );

  const selectFilterTag = React.useCallback(
    tag => () => {
      setCurrentPage(0)
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
    dish => cartDishes.map(d => d.id).includes(dish.id),
    [cartDishes]
  );

  const clearFilter = React.useCallback(() => {
    setSelectedTagIds([]);
  }, []);

  const handlePageChange = React.useCallback(({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected);
  }, []);

  const pagesCount = Math.ceil(dishes.count / 5)

  return (
    <Container p={4} maxW="container.xl">
      <Filter
        selectedTagIds={selectedTagIds}
        onSelect={selectFilterTag}
        onClear={clearFilter}
      />
      {dishes.isValidating &&
        !dishes.items.length &&
        <Center py={6}>
          <Spinner color="red.500" />
        </Center>}
      <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
        {dishes.items.map(dish =>
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
      {pagesCount > 1 && (
        <Center py={6}>
          <Pagination
            count={pagesCount}
            onChange={handlePageChange}
          />
        </Center>
      )}
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
