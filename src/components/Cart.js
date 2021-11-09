import React from 'react'
import { Box, Spacer, Text } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  Button,
  IconButton,
  Stack,
  useToast,
} from "@chakra-ui/react"

import { CloseIcon, CopyIcon } from '@chakra-ui/icons'

const Cart = ({ isOpen, dishes, onRemove, onClean, onClose }) => {
  const toast = useToast()
  
  const copyInvitationLink = React.useCallback(() => {

    if (navigator.clipboard) {
      navigator.clipboard?.writeText(dishes.map(d => d.title).join('\n'));

      toast({
        title: "Cкопировано в буфер обмена",
        status: "success",
        duration: 2000,
        isClosable: true
      });

      onClose();
    } else {
      toast({
        title: "Ошибка копирования",
        status: "error",
        duration: 2000,
        isClosable: true
      });
    }
  }, [dishes, onClose, toast]);

  const total = dishes.reduce((sum, dish) => Math.round((sum + dish.price) * 100) / 100, 0)
  
  return (
    <>
      <Drawer size="sm" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontSize="2xl">Корзина</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className="static-scrollbar">
            {!dishes.length && (
              <Text p={4} textAlign="center" color="gray">В корзине нет ни одного блюда</Text>
            )}
            {dishes.map(dish => (
              <Box key={dish.id} py={4}>
                <Stack direction="row" alignItems="flex-start">
                  <Text>{dish.title}</Text>
                  <Spacer />
                  <IconButton
                    size="xs"
                    colorScheme="red"
                    icon={<CloseIcon fontSize="xs" />}
                    onClick={onRemove(dish)}
                  />
                </Stack>
              </Box>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Stack w="full">
              <Stack pb={6} spacing="1" direction="row" alignItems="flex-end">
                <Text fontSize="2xl">Общая сумма:</Text>
                <Spacer />
                <Text fontSize="4xl" lineHeight="1">
                  {total}
                </Text>
                <Text fontSize="lg">добра</Text>
              </Stack>
              
              <Stack direction="row-reverse">
                <Button isDisabled={!dishes.length} colorScheme="red" leftIcon={<CloseIcon />} onClick={onClean}>
                  Очистить
                </Button>
                <Button isDisabled={!dishes.length} colorScheme="green" leftIcon={<CopyIcon />} mr={2} onClick={copyInvitationLink}>Скопировать</Button>
              </Stack>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Cart
