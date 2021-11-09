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
  useColorMode,
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react"

import { SmallCloseIcon, CopyIcon } from '@chakra-ui/icons'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'

const Cart = ({ isOpen, dishes, onRemove, onClean, onClose }) => {
  const toast = useToast()
  const { colorMode } = useColorMode()
  const [isSmallDevice] = useMediaQuery("(max-width: 448px)")

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

  const total = dishes.reduce((sum, dish) => {
    return Math.round((sum + dish.price) * 100) / 100
  }, 0)

  return (
    <>
      <Drawer size="sm" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay bg={isSmallDevice ? "white" : undefined} />
        <DrawerContent>
          <DrawerHeader fontSize="2xl">Корзина</DrawerHeader>
          <DrawerCloseButton top="20px" />
          <DrawerBody bg={colorMode === "light" ? "gray.50" : "gray.800"} className="static-scrollbar">
            {!dishes.length && (
              <Text p={4} textAlign="center" color="gray">В корзине нет ни одного блюда</Text>
            )}
            {dishes.map(dish => (
              <Box key={dish.id} py={4}>
                <Stack direction="row" alignItems="flex-start">
                  <IconButton
                    size="xs"
                    icon={<SmallCloseIcon fontSize="md" />}
                    onClick={onRemove(dish)}
                  />
                  <Text fontWeight={600}>{dish.title}</Text>
                  <Spacer />
                  <Text minW="16">{dish.price} добра</Text>
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
                <Text fontSize="md">добра</Text>
              </Stack>
              
              <Stack direction="row-reverse">
                <Tooltip label="Очистить корзину">
                  <IconButton
                    isDisabled={!dishes.length}
                    colorScheme="red"
                    icon={<MdOutlineRemoveShoppingCart fontSize="18px" />}
                    onClick={onClean}
                  />
                </Tooltip>
                <Button
                  isDisabled={!dishes.length}
                  colorScheme="green"
                  leftIcon={<CopyIcon />} mr={2}
                  onClick={copyInvitationLink}
                >
                  Скопировать
                </Button>
              </Stack>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Cart
