import React from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import { AspectRatio, Box, Container, Heading, SimpleGrid, WrapItem } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';

import { data } from './data';

const Card = ({ dish, onSelect }) => {
  return (
    <Box as={motion.div} w="full" layoutId={dish.id}>
      <AspectRatio ratio={3/2}>
        <Image
          minW="full"
          as={motion.img}
          layoutId={'img' + dish.id}
          src={dish.imageUrl}
          onClick={onSelect}
        />
      </AspectRatio>
      <Heading as="h4" size="md">{dish.title}</Heading>
    </Box>
  )
}

const Test = () => {
  const [selectedId, setSelectedId] = React.useState(null);

  const selectedDish = React.useMemo(() => {
    return data.find(d => d.id === selectedId)
  }, [selectedId])

  const select = dish => () => {
    setSelectedId(dish?.id);
  };

  return (
    <AnimateSharedLayout type="crossfade">
      <Container maxW="container.lg">
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {data.map(dish =>
            <WrapItem key={dish.id} maxW="sm">
              <Card dish={dish} onSelect={select(dish)} />
            </WrapItem>
          )}
        </SimpleGrid>
      </Container>
      <AnimatePresence>
        <Modal size="lg" isOpen={Boolean(selectedId)} onClose={select()}>
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
            <Card dish={selectedDish} onSelect={select()} />
          </ModalContent>
        </Modal>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default Test;
