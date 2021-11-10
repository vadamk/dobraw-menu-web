import React, { Suspense } from "react";
import { Center, Container, SimpleGrid, WrapItem } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/react";

import useDishes from "./hooks/useDishes";

const Dish = React.lazy(() => import("./components/Dish"));
const CartButton = React.lazy(() => import("./components/CartButton"));
const Cart = React.lazy(() => import("./components/Cart"));
const DishDesktopModal = React.lazy(() =>
  import("./components/DishDesktopModal")
);
const Filter = React.lazy(() => import("./components/Filter"));
const Pagination = React.lazy(() => import("./components/Pagination"));

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
      setCurrentPage(0);
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

  const pagesCount = Math.ceil(dishes.count / 5);

  return (
    <Container p={4} maxW="container.xl">
      <Suspense fallback={null}>
        <Filter
          selectedTagIds={selectedTagIds}
          onSelect={selectFilterTag}
          onClear={clearFilter}
        />
      </Suspense>
      {dishes.isValidating &&
        !dishes.items.length &&
        <Center py={6}>
          <Spinner color="red.500" />
        </Center>}
      <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
        {dishes.items.map(dish =>
          <WrapItem key={dish.id}>
            <Suspense fallback={null}>
              <Dish
                dish={dish}
                inCart={isInCart(dish)}
                onOpen={openDetail(dish)}
                onCartToggle={toggleCart(dish)}
              />
            </Suspense>
          </WrapItem>
        )}
      </SimpleGrid>
      {pagesCount > 1 &&
        <Center py={6}>
          <Suspense fallback={null}>
            <Pagination
              page={currentPage}
              count={pagesCount}
              onChange={handlePageChange}
            />
          </Suspense>
        </Center>}
      <Suspense fallback={null}>
        <Cart
          dishes={cartDishes}
          onRemove={toggleCart}
          onClean={cleanCart}
          {...cartModal}
        />
      </Suspense>
      <Suspense fallback={null}>
        <CartButton count={cartDishes.length} onClick={cartModal.onOpen} />
      </Suspense>
      {selectedDish &&
        <Suspense fallback={null}>
          <DishDesktopModal
            dish={selectedDish}
            inCart={isInCart(selectedDish)}
            onClose={detailClose}
            onCartToggle={toggleCart(selectedDish)}
          />
        </Suspense>}
    </Container>
  );
}

export default App;
